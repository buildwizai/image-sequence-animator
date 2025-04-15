import React, { useState, useEffect, useRef } from 'react'; // Add useEffect, useRef
import useImagePreloader from './hooks/useImagePreloader';

export interface ImageSequenceAnimatorProps { // Add export
  /** Array of image URLs to animate */
  imageUrls: string[];
  /** Desired frame rate in frames per second (default: 30) */
  frameRate?: number;
  /** Whether the animation should loop (default: true) */
  loop?: boolean;
  /** Optional CSS class name for the container */
  className?: string;
  /** Optional inline styles for the container */
  style?: React.CSSProperties;
  /** Array of available playback speeds (default: [0.5, 1, 2]) */
  playbackSpeeds?: number[];
}

const defaultPlaybackSpeeds = [0.5, 1, 2];

const ImageSequenceAnimator: React.FC<ImageSequenceAnimatorProps> = ({
  imageUrls,
  frameRate = 30, // Default frameRate
  loop = true, // Default loop
  className,
  style,
  playbackSpeeds = defaultPlaybackSpeeds, // Use default speeds if not provided
}) => {
  const { isLoading, loadedCount, totalCount, errorCount, errors } = useImagePreloader(imageUrls);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(1); // State for playback speed, default 1x
  const frameRateRef = useRef(frameRate);
  const loopRef = useRef(loop); // Ref to store latest loop prop
  const animationFrameId = useRef<number | null>(null); // Ref for animation frame ID
  const lastFrameTime = useRef<number>(0); // Ref for timing logic
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main container div

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
    const frameInterval = 1000 / effectiveFrameRate; // Time per frame in ms

    const animate = (timestamp: number) => {
      if (lastFrameTime.current === 0) {
        lastFrameTime.current = timestamp; // Initialize last frame time
      }

      const elapsed = timestamp - lastFrameTime.current;

      if (elapsed >= frameInterval) {
        lastFrameTime.current = timestamp - (elapsed % frameInterval); // Adjust for potential overshoot

        setCurrentFrameIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Use loadedCount which reflects successfully loaded images
          if (nextIndex >= loadedCount) {
            return loopRef.current ? 0 : prevIndex; // Loop or stop at the last loaded frame
          }
          return nextIndex;
        });
      }

      // Request next frame
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation only if isPlaying is true
    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      // Ensure timer is reset if paused right at the start
      lastFrameTime.current = 0;
    }

    // Cleanup function
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      lastFrameTime.current = 0; // Reset timer on cleanup/restart
    };

  }, [isLoading, loadedCount, isPlaying, currentSpeed]); // Add currentSpeed to dependency array

  // --- Navigation Handlers ---
  const handlePreviousFrame = () => {
    if (isLoading || currentFrameIndex === 0) return; // Prevent action if loading or at first frame
    setIsPlaying(false); // Pause on manual navigation
    setCurrentFrameIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextFrame = () => {
    if (isLoading || currentFrameIndex >= loadedCount - 1) return; // Prevent action if loading or at last frame
    setIsPlaying(false); // Pause on manual navigation
    setCurrentFrameIndex((prevIndex) => prevIndex + 1);
  };

  const togglePlayPause = () => {
    if (isLoading) return;
    setIsPlaying(!isPlaying);
  };

  // --- Keyboard Navigation ---
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isLoading) return; // Ignore keyboard input while loading

    switch (event.key) {
      case ' ': // Spacebar
      case 'k': // Common video shortcut
        event.preventDefault(); // Prevent page scroll
        togglePlayPause();
        break;
      case 'ArrowLeft':
      case 'j': // Common video shortcut
        event.preventDefault();
        handlePreviousFrame();
        break;
      case 'ArrowRight':
      case 'l': // Common video shortcut
        event.preventDefault();
        handleNextFrame();
        break;
      default:
        break;
    }
  };


  // Basic validation (keep this)
  if (!imageUrls || imageUrls.length === 0) {
    console.error('ImageSequenceAnimator: imageUrls prop is required and cannot be empty.');
    return <div style={{ color: 'red', padding: '1rem' }}>Error: No image URLs provided.</div>;
  }

  if (frameRate <= 0) {
    console.warn(`ImageSequenceAnimator: Invalid frameRate (${frameRate}). Using default 30 FPS.`);
    frameRate = 30;
  }

  // --- Loading State ---
  if (isLoading) {
    const progress = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 0;
    return (
      <div className={className} style={{ ...style, padding: '1rem', textAlign: 'center' }}>
        Loading images... ({loadedCount}/{totalCount}) {progress}%
        {errorCount > 0 && (
          <div style={{ color: 'orange', marginTop: '0.5rem' }}>
            {errorCount} image(s) failed to load.
          </div>
        )}
      </div>
    );
  }

  // --- Error State (if all images failed or initial validation failed) ---
  // This check handles the case where preloading finished, but all images resulted in errors.
  if (loadedCount === 0 && totalCount > 0) {
     console.error(`ImageSequenceAnimator: All ${totalCount} images failed to load.`);
     return (
       <div className={className} style={{ ...style, color: 'red', padding: '1rem' }}>
         Error: Could not load any images. Failed URLs: {errors.join(', ')}
       </div>
     );
  }

  // --- Ready State ---
  // Ensure currentFrameIndex is valid (should not exceed the number of *loaded* images)
  // Use loadedCount instead of imageUrls.length for indexing
  const validFrameIndex = Math.min(currentFrameIndex, loadedCount > 0 ? loadedCount - 1 : 0);
  const currentImageUrl = imageUrls[validFrameIndex]; // Get URL based on the valid index

  // If the original URL for the displayIndex failed, we might want a fallback?
  // For now, we assume the component should still try to render *something* if at least one image loaded.
  // A more robust solution might filter out failed URLs from the sequence.

  return (
    // Add ref, tabIndex and onKeyDown to the container for keyboard navigation
    <div
      ref={containerRef}
      className={className}
      style={style}
      tabIndex={0} // Make container focusable
      onKeyDown={handleKeyDown} // Add keyboard listener
      role="application" // Role for interactive component
      aria-roledescription="image sequence player"
      aria-label="Image sequence player" // General label for the component
    >
      {currentImageUrl ? (
        <img
          src={currentImageUrl}
          alt={`Image sequence frame ${validFrameIndex + 1}`} // Use valid index in alt text
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      ) : (
        // Fallback if somehow currentImageUrl is undefined
        <div style={{ color: 'orange', padding: '1rem' }}>Frame {validFrameIndex + 1} unavailable.</div>
      )}
      {/* --- Controls --- */}
      <div
        className="image-sequence-controls" // Add a class for potential external styling
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap', // Allow controls to wrap on smaller screens
        }}
        // Prevent keyboard events on controls from bubbling up to the main container
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Navigation Controls */}
        <button
          onClick={handlePreviousFrame}
          disabled={isLoading || currentFrameIndex === 0}
          style={{ padding: '0.3rem 0.6rem', cursor: 'pointer' }}
          aria-label="Previous Frame" // ARIA label
        >
          Prev
        </button>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause} // Use toggle function
          disabled={isLoading}
          style={{ padding: '0.3rem 0.6rem', cursor: 'pointer', minWidth: '50px' }}
          aria-label={isPlaying ? 'Pause Animation' : 'Play Animation'} // Dynamic ARIA label
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {/* Navigation Controls */}
        <button
          onClick={handleNextFrame}
          disabled={isLoading || currentFrameIndex >= loadedCount - 1}
          style={{ padding: '0.3rem 0.6rem', cursor: 'pointer' }}
          aria-label="Next Frame" // ARIA label
        >
          Next
        </button>
        {/* Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', gap: '0.3rem' }}>
          <span id="speed-label">Speed:</span> {/* Add id for aria-labelledby */}
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
              aria-labelledby="speed-label" // Associate button with the "Speed:" label
              aria-pressed={currentSpeed === speed} // Indicate current speed
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
      {/* --- Error Warning --- */}
      {errorCount > 0 && (
        <div style={{ color: 'orange', fontSize: '0.8em', marginTop: '0.5rem' }} role="alert"> {/* Add role="alert" */}
          Warning: {errorCount} image(s) failed to load and will be skipped.
        </div>
      )}
    </div>
  );
};

export default ImageSequenceAnimator;
