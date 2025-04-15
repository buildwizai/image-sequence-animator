import { useState, useEffect } from 'react';
import { marked } from 'marked';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ImageSequenceAnimator from './ImageSequenceAnimator';

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [copiedText, setCopiedText] = useState('');

  // Function to handle copying text
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // Configure marked options for better rendering
  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true
    });
  }, []);

  // Sample images for demo
  const imgURLs = Array.from(
    { length: 30 },
    (_, i) => `https://picsum.photos/800/600?random=${i + 1}`
  );

  // Demo configuration options
  const demoConfigs = [
    { frameRate: 5, loop: true, title: 'Standard Animation (5 FPS)' },
    { frameRate: 15, loop: true, title: 'Faster Animation (15 FPS)' },
    { frameRate: 3, loop: false, title: 'Slow Animation, No Loop (3 FPS)' }
  ];

  // Installation commands
  const npmInstall = `npm install image-sequence-animator`;
  const yarnInstall = `yarn add image-sequence-animator`;
  const pnpmInstall = `pnpm add image-sequence-animator`;

  // Code examples
  const basicExample = `import React from 'react';
import ImageSequenceAnimator from 'image-sequence-animator';

const MyComponent = () => {
  // Array of image URLs with random images from Lorem Picsum
  const imageUrls = Array.from(
    { length: 20 },
    (_, i) => \`https://picsum.photos/800/600?random=\${i + 1}\`
  );

  return (
    <ImageSequenceAnimator
      imageUrls={imageUrls}
      frameRate={24}
      loop={true}
      style={{ maxWidth: '600px', margin: 'auto' }}
    />
  );
};`;

  const advancedExample = `import React from 'react';
import ImageSequenceAnimator from 'image-sequence-animator';

const ProductViewer = () => {
  // Generate frames from random images for a 360° view effect
  const imageUrls = Array.from(
    { length: 36 },
    (_, i) => \`https://picsum.photos/800/600?random=\${i + 1}\`
  );

  return (
    <div className="product-viewer">
      <h2>Product 360° View</h2>
      <ImageSequenceAnimator
        imageUrls={imageUrls}
        frameRate={30}
        loop={true}
        playbackSpeeds={[0.25, 0.5, 1, 2, 4]}
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      />
      <p>Use the controls to rotate the product or drag to rotate manually</p>
    </div>
  );
};`;

  // Usage example for documentation
  const usageExample = `import React from 'react';
import ImageSequenceAnimator from 'image-sequence-animator';

function MyComponent() {
  const images = [
    'https://example.com/frame1.jpg',
    'https://example.com/frame2.jpg',
    'https://example.com/frame3.jpg',
    // Add more image URLs as needed
  ];

  return (
    <ImageSequenceAnimator
      imageUrls={images}
      frameRate={24}
      loop={true}
    />
  );
}`;

  // Event handling example
  const eventHandlingExample = `<ImageSequenceAnimator
  imageUrls={images}
  frameRate={24}
  onFrameChange={(index) => console.log(\`Current frame: \${index}\`)}
  onPlaybackStateChange={(isPlaying) => console.log(\`Playback: \${isPlaying ? 'playing' : 'paused'}\`)}
/>`;

  // Customizing controls example
  const customizingControlsExample = `<ImageSequenceAnimator
  imageUrls={images}
  frameRate={24}
  customControls={{
    showSpeedControl: true,
    showFrameCount: true,
    controlsClassName: "my-custom-controls",
    controlsPosition: "bottom" // or "top"
  }}
/>`;

  // README content - removed the code block since we'll display it separately
  const readmeContent = `
# Image Sequence Animator

A lightweight React component for animating a sequence of images with playback controls,
mimicking a video-like experience. Ideal for product showcases, interactive tutorials,
or frame-by-frame animations.

## Features

- Sequential image playback based on a list of URLs
- Configurable frame rate
- Optional looping
- Playback controls: Play/Pause, Speed selection, Previous/Next frame navigation
- Image preloading with loading state display
- Keyboard navigation support (Space/k for play/pause, Left/j for previous, Right/l for next)
- Built with TypeScript

## Usage

Below is a basic implementation example:

## Browser Support

- Chrome, Firefox, Safari, and Edge
- IE 11 (with appropriate polyfills)
`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Image Sequence Animator</h1>
        <p className="text-xl text-gray-600 mb-4">
          A powerful React component for animating sequences of images with fine-grained control
        </p>
        <div className="flex justify-center gap-2">
          <img src="https://img.shields.io/npm/v/image-sequence-animator.svg" alt="npm version" />
          <img src="https://img.shields.io/npm/dm/image-sequence-animator.svg" alt="downloads" />
          <img src="https://img.shields.io/github/license/buildwizai/image-sequence-animator" alt="license" />
        </div>
      </header>

      <nav className="mb-8 border-b border-gray-200">
        <ul className="flex justify-center">
          <li
            className={`px-6 py-3 cursor-pointer transition-colors ${tabIndex === 0 ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'hover:text-blue-500'}`}
            onClick={() => setTabIndex(0)}
          >
            Demo
          </li>
          <li
            className={`px-6 py-3 cursor-pointer transition-colors ${tabIndex === 1 ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'hover:text-blue-500'}`}
            onClick={() => setTabIndex(1)}
          >
            Installation
          </li>
          <li
            className={`px-6 py-3 cursor-pointer transition-colors ${tabIndex === 2 ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'hover:text-blue-500'}`}
            onClick={() => setTabIndex(2)}
          >
            Documentation
          </li>
          <li
            className={`px-6 py-3 cursor-pointer transition-colors ${tabIndex === 3 ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'hover:text-blue-500'}`}
            onClick={() => setTabIndex(3)}
          >
            Examples
          </li>
        </ul>
      </nav>

      <main>
        {/* Demo Section */}
        {tabIndex === 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Interactive Demos</h2>
            <p className="mb-6">Try out these examples of the Image Sequence Animator component with different configurations:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {demoConfigs.map((config, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <h3 className="bg-gray-50 p-4 font-medium">{config.title}</h3>
                  <ImageSequenceAnimator
                    imageUrls={imgURLs}
                    frameRate={config.frameRate}
                    loop={config.loop}
                    style={{
                      maxWidth: '100%',
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  />
                  <div className="p-2 text-center">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">frameRate: {config.frameRate}, loop: {config.loop.toString()}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Installation Section */}
        {tabIndex === 1 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <p className="mb-6">Add Image Sequence Animator to your React project:</p>

            <div className="flex flex-col gap-4 my-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="font-medium">npm</span>
                  <button
                    className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === npmInstall ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={() => handleCopy(npmInstall)}
                  >
                    {copiedText === npmInstall ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <SyntaxHighlighter language="bash" style={docco} className="m-0 rounded-none">
                  {npmInstall}
                </SyntaxHighlighter>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="font-medium">yarn</span>
                  <button
                    className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === yarnInstall ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={() => handleCopy(yarnInstall)}
                  >
                    {copiedText === yarnInstall ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <SyntaxHighlighter language="bash" style={docco} className="m-0 rounded-none">
                  {yarnInstall}
                </SyntaxHighlighter>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="font-medium">pnpm</span>
                  <button
                    className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === pnpmInstall ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={() => handleCopy(pnpmInstall)}
                  >
                    {copiedText === pnpmInstall ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <SyntaxHighlighter language="bash" style={docco} className="m-0 rounded-none">
                  {pnpmInstall}
                </SyntaxHighlighter>
              </div>
            </div>

            <h3 className="text-xl font-bold mt-8 mb-2">Requirements</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>React 16.8+ (uses React Hooks)</li>
              <li>Compatible with React 18 and 19</li>
            </ul>
          </section>
        )}

        {/* Documentation Section */}
        {tabIndex === 2 && (
          <section className="docs-section">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Navigation Sidebar */}
              <div className="w-full md:w-56 lg:w-64 shrink-0">
                <div className="sticky top-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-lg mb-3">Documentation</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#overview" className="text-blue-600 hover:text-blue-800 hover:underline block">Overview</a>
                    </li>
                    <li>
                      <a href="#features" className="text-blue-600 hover:text-blue-800 hover:underline block">Features</a>
                    </li>
                    <li>
                      <a href="#usage" className="text-blue-600 hover:text-blue-800 hover:underline block">Usage</a>
                    </li>
                    <li>
                      <a href="#props" className="text-blue-600 hover:text-blue-800 hover:underline block">Props Reference</a>
                    </li>
                    <li>
                      <a href="#browser-support" className="text-blue-600 hover:text-blue-800 hover:underline block">Browser Support</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Documentation Content */}
              <div className="flex-1">
                {/* Using custom CSS classes to style the rendered markdown */}
                <div
                  className="markdown-content prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked.parse(readmeContent) }}
                />

                {/* Usage Example with Copy Button - inserted after the Usage section */}
                <div id="usage-example" className="border border-gray-200 rounded-lg overflow-hidden mb-12 mt-4">
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <span className="font-medium">Basic Usage</span>
                    <button
                      className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === usageExample ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                      onClick={() => handleCopy(usageExample)}
                    >
                      {copiedText === usageExample ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <SyntaxHighlighter language="jsx" style={docco} className="m-0 rounded-none">
                    {usageExample}
                  </SyntaxHighlighter>
                </div>

                <h2 id="props" className="text-2xl font-bold mt-12 mb-4 pb-2 border-b border-gray-200">Props Reference</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                          <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                          <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">imageUrls</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">string[]</code></td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700">Required</td>
                          <td className="px-4 py-3 text-sm">Array of image URLs to animate sequentially</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">frameRate</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">number</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">30</code></td>
                          <td className="px-4 py-3 text-sm">Desired frame rate in frames per second</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">loop</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">boolean</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">true</code></td>
                          <td className="px-4 py-3 text-sm">Whether the animation should loop back to the start after completion</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">playbackSpeeds</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">number[]</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">[0.5, 1, 2]</code></td>
                          <td className="px-4 py-3 text-sm">Array of available playback speed multipliers for the speed selector</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">className</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">string</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">undefined</code></td>
                          <td className="px-4 py-3 text-sm">Optional CSS class name for the container element</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">style</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">React.CSSProperties</code></td>
                          <td className="px-4 py-3 text-sm"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">undefined</code></td>
                          <td className="px-4 py-3 text-sm">Optional inline styles for the container element</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 mb-6">
                  <h2 id="methods" className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">Advanced Usage</h2>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-8">
                    <h3 className="text-xl font-semibold mb-3">Event Handling</h3>
                    <p className="mb-4">You can listen to various events triggered by the animator:</p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <span className="font-medium">Event Handling Example</span>
                        <button
                          className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === eventHandlingExample ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                          onClick={() => handleCopy(eventHandlingExample)}
                        >
                          {copiedText === eventHandlingExample ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <SyntaxHighlighter language="jsx" style={docco} className="m-0 rounded-none">
                        {eventHandlingExample}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <h3 className="text-xl font-semibold mb-3">Customizing Controls</h3>
                    <p className="mb-4">You can customize the control panel appearance:</p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <span className="font-medium">Customizing Controls Example</span>
                        <button
                          className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === customizingControlsExample ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                          onClick={() => handleCopy(customizingControlsExample)}
                        >
                          {copiedText === customizingControlsExample ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <SyntaxHighlighter language="jsx" style={docco} className="m-0 rounded-none">
                        {customizingControlsExample}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded my-8">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <p className="text-blue-700 mb-2">
                    If you encounter any issues or have questions, please check our GitHub repository.
                  </p>
                  <a
                    href="https://github.com/buildwizai/image-sequence-animator/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Open an Issue
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Examples Section */}
        {tabIndex === 3 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Code Examples</h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Basic Example</h3>
              <p className="mb-4">A simple implementation with minimal configuration:</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="font-medium">React Component</span>
                  <button
                    className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === basicExample ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={() => handleCopy(basicExample)}
                  >
                    {copiedText === basicExample ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <SyntaxHighlighter language="jsx" style={docco} className="m-0 rounded-none">
                  {basicExample}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Advanced Example</h3>
              <p className="mb-4">Product 360° viewer with custom styling and extended controls:</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="font-medium">React Component</span>
                  <button
                    className={`px-3 py-1 rounded text-sm text-white transition-colors ${copiedText === advancedExample ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={() => handleCopy(advancedExample)}
                  >
                    {copiedText === advancedExample ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <SyntaxHighlighter language="jsx" style={docco} className="m-0 rounded-none">
                  {advancedExample}
                </SyntaxHighlighter>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-12 pt-4 border-t border-gray-200 text-center">
        <p className="flex justify-center gap-2 items-center">
          <a href="https://github.com/buildwizai/image-sequence-animator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            GitHub Repository
          </a>
          <span className="text-gray-400">|</span>
          <a href="https://www.npmjs.com/package/image-sequence-animator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            NPM Package
          </a>
        </p>
        <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} Image Sequence Animator - MIT License</p>
      </footer>

      <style jsx>{`
        /* Add styles for markdown content rendering */
        .markdown-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .markdown-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .markdown-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .markdown-content ul {
          list-style-type: disc;
          margin-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .markdown-content ul li {
          margin-bottom: 0.25rem;
        }
        .markdown-content pre {
          margin-bottom: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        .markdown-content code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875rem;
          padding: 0.125rem 0.25rem;
          background-color: #f1f5f9;
          border-radius: 0.25rem;
        }
        .markdown-content pre code {
          padding: 0;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default App;
