import { useState, useEffect } from 'react';

interface PreloaderState {
  isLoading: boolean;
  loadedCount: number;
  totalCount: number;
  errorCount: number;
  errors: string[]; // Store URLs that failed to load
}

/**
 * Custom hook to preload a list of image URLs.
 * @param imageUrls - Array of image URLs to preload.
 * @returns State object containing loading status, progress, and errors.
 */
const useImagePreloader = (imageUrls: string[]): PreloaderState => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const totalCount = imageUrls.length;

  useEffect(() => {
    if (!imageUrls || totalCount === 0) {
      setIsLoading(false);
      return;
    }

    // Reset state for new imageUrls array
    setIsLoading(true);
    setLoadedCount(0);
    setErrorCount(0);
    setErrors([]);

    let currentLoaded = 0;
    let currentErrors = 0;
    const currentErrorUrls: string[] = [];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;

      const handleLoad = () => {
        currentLoaded++;
        setLoadedCount(currentLoaded);
        checkCompletion();
        // Clean up listeners
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };

      const handleError = () => {
        console.warn(`ImageSequenceAnimator: Failed to load image: ${url}`);
        currentErrors++;
        currentErrorUrls.push(url);
        setErrorCount(currentErrors);
        setErrors([...currentErrorUrls]); // Update errors state immutably
        checkCompletion();
        // Clean up listeners
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };

      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
    });

    const checkCompletion = () => {
      if (currentLoaded + currentErrors === totalCount) {
        setIsLoading(false);
      }
    };

    // Initial check in case the array was empty or all images load/error synchronously (unlikely but safe)
    checkCompletion();

  }, [imageUrls, totalCount]); // Rerun effect if imageUrls array reference changes

  return { isLoading, loadedCount, totalCount, errorCount, errors };
};

export default useImagePreloader;
