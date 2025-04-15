import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers for type recognition
import ImageSequenceAnimator, { ImageSequenceAnimatorProps } from '../src/ImageSequenceAnimator'; // Adjust path as needed

// Mock the preloader hook to control loading state in tests
jest.mock('../src/hooks/useImagePreloader', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoading: false, // Default to loaded state for basic tests
    loadedCount: 3,   // Assume 3 images loaded
    totalCount: 3,
    errorCount: 0,
    errors: [],
  })),
}));

const mockImageUrls = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

const defaultProps: ImageSequenceAnimatorProps = {
  imageUrls: mockImageUrls,
};

describe('ImageSequenceAnimator', () => {
  it('renders the component container', () => {
    render(<ImageSequenceAnimator {...defaultProps} />);
    // Check if the main container div (which should have role="application") is rendered
    const container = screen.getByRole('application');
    expect(container).toBeInTheDocument();
  });

  it('renders the first image when loaded', () => {
    render(<ImageSequenceAnimator {...defaultProps} />);
    // Alt text is "Image sequence frame N"
    const imageElement = screen.getByAltText(/Image sequence frame 1/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImageUrls[0]);
  });

  it('renders controls (Play/Pause button)', () => {
    render(<ImageSequenceAnimator {...defaultProps} />);
    // Check for the Play/Pause button (assuming default state is playing -> shows Pause)
    const pauseButton = screen.getByRole('button', { name: /pause animation/i });
    expect(pauseButton).toBeInTheDocument();
  });

  // --- Placeholder for further tests ---
  // More tests are needed for:
  // - Loading state display
  // - Error state display (no images, all images fail)
  // - Animation logic (frame changes - requires async timers)
  // - Play/Pause functionality interaction
  // - Speed control interaction
  // - Navigation control interaction (Prev/Next)
  // - Loop behavior
  // - Keyboard navigation
  // - Edge cases (empty array, invalid frameRate)
  //
  // NOTE: Comprehensive testing is currently blocked by issues modifying
  // the component file (src/ImageSequenceAnimator.tsx) and inconsistent
  // error reporting. The component file might contain syntax errors
  // affecting test outcomes.
});
