# Image Sequence Animator

[![npm version](https://badge.fury.io/js/image-sequence-animator.svg)](https://badge.fury.io/js/image-sequence-animator)
[![CI Status](https://github.com/your-username/image-sequence-animator/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/image-sequence-animator/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/image-sequence-animator.svg)](https://www.npmjs.com/package/image-sequence-animator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight React component for animating a sequence of images with playback controls, mimicking a video-like experience. Ideal for product showcases, interactive tutorials, or frame-by-frame animations.

## Features

-   Sequential image playback based on a list of URLs.
-   Configurable frame rate.
-   Optional looping.
-   Playback controls: Play/Pause, Speed selection, Previous/Next frame navigation.
-   Image preloading with loading state display.
-   Basic error handling for failed image loads.
-   Keyboard navigation support (Space/k for play/pause, Left/j for previous, Right/l for next).
-   Built with TypeScript.

## Installation

```bash
npm install image-sequence-animator
# or
yarn add image-sequence-animator
# or
pnpm add image-sequence-animator
```

## Usage

```tsx
import React from 'react';
import ImageSequenceAnimator, { ImageSequenceAnimatorProps } from 'image-sequence-animator';

const MyComponent = () => {
  // Array of image URLs (replace with your actual image URLs)
  const imageUrls = Array.from(
    { length: 50 }, // Example: 50 frames
    (_, i) => `https://example.com/path/to/your/image_frame_${String(i + 1).padStart(3, '0')}.jpg`
  );

  return (
    <div>
      <h2>My Animation</h2>
      <ImageSequenceAnimator
        imageUrls={imageUrls}
        frameRate={24} // Optional: default is 30
        loop={true} // Optional: default is true
        playbackSpeeds={[0.5, 1, 1.5, 2]} // Optional: default is [0.5, 1, 2]
        style={{ border: '1px solid #ccc', maxWidth: '600px', margin: 'auto' }} // Optional styling
      />
    </div>
  );
};

export default MyComponent;
```

### JavaScript Example

```javascript
import ImageSequenceAnimator from 'image-sequence-animator';

const MyComponent = () => {
  const imageUrls = [
    'https://example.com/frame1.jpg',
    'https://example.com/frame2.jpg',
    'https://example.com/frame3.jpg',
  ];

  return (
    <ImageSequenceAnimator
      imageUrls={imageUrls}
      frameRate={24}
      loop={true}
      style={{ maxWidth: '600px', margin: 'auto' }}
    />
  );
};
```

## Props

| Prop             | Type                   | Default       | Description                                                 |
| ---------------- | ---------------------- | ------------- | ----------------------------------------------------------- |
| `imageUrls`      | `string[]`             | **Required**  | Array of image URLs to animate.                             |
| `frameRate`      | `number`               | `30`          | Desired frame rate in frames per second.                    |
| `loop`           | `boolean`              | `true`        | Whether the animation should loop back to the start.        |
| `playbackSpeeds` | `number[]`             | `[0.5, 1, 2]` | Array of available playback speed multipliers for controls. |
| `className`      | `string`               | `undefined`   | Optional CSS class name for the main container `div`.       |
| `style`          | `React.CSSProperties`  | `undefined`   | Optional inline styles for the main container `div`.        |

## Development

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server (if applicable, e.g., for a demo page): `npm run dev`
4.  Run Storybook: `npm run storybook`
5.  Run tests: `npm run test`
6.  Build the library: `npm run build`

## GitHub Pages Demo

This library includes support for automatically deploying a demo page to GitHub Pages. The demo page will showcase the component in action.

### Local Development

To build the GitHub Pages demo locally:

```bash
npm run build:github
```

This will create a build in the `dist` directory that's configured for GitHub Pages hosting.

### Automatic Deployment

The GitHub Actions workflow is set up to automatically deploy the demo to GitHub Pages whenever changes are pushed to the main branch. The demo will be available at:

```
https://[your-username].github.io/image-sequence-animator/
```

Make sure to enable GitHub Pages in your repository settings and set the source to the `gh-pages` branch.

## Contributing

Contributions are welcome! Please refer to `CONTRIBUTING.md` for guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
