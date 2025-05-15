import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageSequenceAnimator from '../ImageSequenceAnimator';

// Mock window.requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Mock Image constructor
class MockImage {
  constructor() {
    this.listeners = {
      load: [],
      error: []
    };
    setTimeout(() => {
      this.listeners.load.forEach(cb => cb());
    }, 0);
  }

  addEventListener(event, callback) {
    this.listeners[event].push(callback);
  }

  removeEventListener(event, callback) {
    const index = this.listeners[event].indexOf(callback);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  }
}
global.Image = MockImage;

describe('ImageSequenceAnimator', () => {
  const mockImageUrls = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );
    expect(container).toBeTruthy();
  });

  it('displays the first image initially', async () => {
    const { getByRole } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );
    
    // Wait for images to "load"
    await act(async () => {
      jest.runAllTimers();
    });

    const img = getByRole('img');
    expect(img).toHaveAttribute('src', mockImageUrls[0]);
    expect(img).toHaveAttribute('alt', 'Image sequence frame 1');
  });

  it('responds to play/pause button clicks', async () => {
    const { getByRole } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );

    // Wait for images to "load"
    await act(async () => {
      jest.runAllTimers();
    });

    const playPauseButton = getByRole('button', { name: /pause animation/i });
    expect(playPauseButton).toHaveTextContent('Pause');

    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveTextContent('Play');
  });

  it('handles keyboard navigation', async () => {
    const { getByRole, container } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );

    // Wait for images to "load"
    await act(async () => {
      jest.runAllTimers();
    });

    const img = getByRole('img');
    expect(img).toHaveAttribute('src', mockImageUrls[0]);

    // Test right arrow key
    fireEvent.keyDown(container.firstChild, { key: 'ArrowRight' });
    expect(img).toHaveAttribute('src', mockImageUrls[1]);

    // Test left arrow key
    fireEvent.keyDown(container.firstChild, { key: 'ArrowLeft' });
    expect(img).toHaveAttribute('src', mockImageUrls[0]);

    // Test spacebar for play/pause
    const playPauseButton = getByRole('button', { name: /play animation/i });
    fireEvent.keyDown(container.firstChild, { key: ' ' });
    expect(playPauseButton).toHaveTextContent('Pause');
  });

  it('handles speed changes', async () => {
    const { getByRole, getAllByRole } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );

    // Wait for images to "load"
    await act(async () => {
      jest.runAllTimers();
    });

    const speedButtons = getAllByRole('button').filter(button => button.getAttribute('aria-labelledby') === 'speed-label');
    expect(speedButtons).toHaveLength(3); // Default speeds: 0.5x, 1x, 2x

    // Click 2x speed button
    const fastButton = speedButtons.find(button => button.textContent === '2x');
    fireEvent.click(fastButton);
    expect(fastButton).toHaveStyle({ border: '2px solid #007bff' });
  });

  it('shows error message when images fail to load', async () => {
    // Override the mock Image to simulate a loading error
    const originalImage = global.Image;
    global.Image = class {
      constructor() {
        this.listeners = {
          load: [],
          error: []
        };
        setTimeout(() => {
          this.listeners.error.forEach(cb => cb());
        }, 0);
      }

      addEventListener(event, callback) {
        this.listeners[event].push(callback);
      }

      removeEventListener(event, callback) {
        const index = this.listeners[event].indexOf(callback);
        if (index !== -1) {
          this.listeners[event].splice(index, 1);
        }
      }
    };

    const { getByRole } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );

    // Wait for "error" events to fire
    await act(async () => {
      jest.runAllTimers();
    });

    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/failed to load/i);

    // Restore original Image mock
    global.Image = originalImage;
  });

  it('shows filename when showFilename prop is true', async () => {
    const { container } = render(
      <ImageSequenceAnimator 
        imageUrls={mockImageUrls} 
        showFilename={true}
      />
    );

    // Wait for images to "load"
    await act(async () => {
      jest.runAllTimers();
    });

    const filenameDisplay = container.querySelector('div:last-child');
    expect(filenameDisplay).toHaveTextContent('image1.jpg');
  });

  it('disables navigation buttons appropriately', async () => {
    const { getByRole } = render(
      <ImageSequenceAnimator imageUrls={mockImageUrls} />
    );

    // Wait for images to "load"
    await act(async () => {
      jest.runAllTimers();
    });

    const prevButton = getByRole('button', { name: /previous frame/i });
    const nextButton = getByRole('button', { name: /next frame/i });

    // At first frame, prev should be disabled
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // Go to last frame
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    // At last frame, next should be disabled
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
