import React, { useState, useEffect, useRef } from 'react';
import useImagePreloader from './hooks/useImagePreloader';

const defaultPlaybackSpeeds = [0.5, 1, 2];

/**
 * @param {Object} props
 * @param {string[]} props.imageUrls - Array of image URLs to animate
 * @param {number} [props.frameRate=30] - Desired frame rate in frames per second
 * @param {boolean} [props.loop=true] - Whether the animation should loop
 * @param {string} [props.className] - Optional CSS class name for the container
 * @param {Object} [props.style] - Optional inline styles for the container
 * @param {number[]} [props.playbackSpeeds=[0.5, 1, 2]] - Array of available playback speeds
 * @param {boolean} [props.showFilename=false] - Whether to display the filename of the current image
 */
const ImageSequenceAnimator = ({
  imageUrls,
  frameRate = 30,
  loop = true,
  className,
  style,
  playbackSpeeds = defaultPlaybackSpeeds,
  showFilename = false,
}) => {
  const { isLoading, loadedCount, totalCount, errorCount, errors } = useImagePreloader(imageUrls);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const frameRateRef = useRef(frameRate);
  const loopRef = useRef(loop);
  const animationFrameId = useRef(null);
  const lastFrameTime = useRef(0);
  const containerRef = useRef(null);

  // Update refs if props change
  useEffect(() => {
    frameRateRef.current = frameRate;
    loopRef.current = loop;
  }, [frameRate, loop]);

  // Animation effect
  useEffect(() => {
    // Don't start animation until images are loaded
    if (isLoading || loadedCount === 0) {
      return;
    }

    // Adjust frame interval based on current speed
    const effectiveFrameRate = frameRateRef.current * currentSpeed;
    const frameInterval = 1000 / effectiveFrameRate;

    const animate = (timestamp) => {
      if (lastFrameTime.current === 0) {
        lastFrameTime.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTime.current;

      if (elapsed >= frameInterval) {
        lastFrameTime.current = timestamp - (elapsed % frameInterval);

        setCurrentFrameIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= loadedCount) {
            return loopRef.current ? 0 : prevIndex;
          }
          return nextIndex;
        });
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      lastFrameTime.current = 0;
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      lastFrameTime.current = 0;
    };

  }, [isLoading, loadedCount, isPlaying, currentSpeed]);

  const handlePreviousFrame = () => {
    if (isLoading || currentFrameIndex === 0) return;
    setIsPlaying(false);
    setCurrentFrameIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextFrame = () => {
    if (isLoading || currentFrameIndex >= loadedCount - 1) return;
    setIsPlaying(false);
    setCurrentFrameIndex((prevIndex) => prevIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlePreviousFrame();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNextFrame();
        break;
      default:
        break;
    }
  };

  // Ensure frame index is valid
  const validFrameIndex = Math.min(Math.max(0, currentFrameIndex), loadedCount - 1);
  const currentImageUrl = loadedCount > 0 ? imageUrls[validFrameIndex] : null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="application"
      aria-roledescription="image sequence player"
      aria-label="Image sequence player"
    >
      {currentImageUrl ? (
        <img
          src={currentImageUrl}
          alt={`Image sequence frame ${validFrameIndex + 1}`}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      ) : (
        <div style={{ color: 'orange', padding: '1rem' }}>Frame {validFrameIndex + 1} unavailable.</div>
      )}
      <div
        className="image-sequence-controls"
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePreviousFrame}
          disabled={isLoading || currentFrameIndex === 0}
          style={{ padding: '0.3rem 0.6rem', cursor: 'pointer' }}
          aria-label="Previous Frame"
        >
          Prev
        </button>
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          style={{ padding: '0.3rem 0.6rem', cursor: 'pointer', minWidth: '50px' }}
          aria-label={isPlaying ? 'Pause Animation' : 'Play Animation'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleNextFrame}
          disabled={isLoading || currentFrameIndex >= loadedCount - 1}
          style={{ padding: '0.3rem 0.6rem', cursor: 'pointer' }}
          aria-label="Next Frame"
        >
          Next
        </button>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', gap: '0.3rem' }}>
          <span id="speed-label">Speed:</span>
          {playbackSpeeds.map((speed) => (
            <button
              key={speed}
              onClick={() => setCurrentSpeed(speed)}
              disabled={currentSpeed === speed}
              style={{
                padding: '0.2rem 0.4rem',
                cursor: 'pointer',
                border: currentSpeed === speed ? '2px solid #007bff' : '1px solid #ccc',
                fontWeight: currentSpeed === speed ? 'bold' : 'normal',
                backgroundColor: currentSpeed === speed ? '#e7f3ff' : '#fff',
              }}
              aria-label={`Set speed to ${speed}x`}
              aria-labelledby="speed-label"
              aria-pressed={currentSpeed === speed}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
      {errorCount > 0 && (
        <div style={{ color: 'orange', fontSize: '0.8em', marginTop: '0.5rem' }} role="alert">
          Warning: {errorCount} image(s) failed to load and will be skipped.
        </div>
      )}
      {showFilename && currentImageUrl && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.9em', color: '#555' }}>
          Filename: {currentImageUrl.split('/').pop()}
        </div>
      )}
    </div>
  );
};

export default ImageSequenceAnimator;
