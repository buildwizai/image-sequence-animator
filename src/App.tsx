import { useState, useEffect } from 'react'
import ImageSequenceAnimator from './ImageSequenceAnimator';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  // Demo images using random placeholder images
  const [imageCount, setImageCount] = useState(30);
  const [frameRate, setFrameRate] = useState(5);
  const [isNavSticky, setIsNavSticky] = useState(false);

  const imgURLs = [];
  for (let i = 1; i <= imageCount; i++) {
    imgURLs.push(`https://picsum.photos/800/600?random=${i}`);
  }

  // Installation code sample
  const installationCode = `npm install react-image-sequence-animator
# or
yarn add react-image-sequence-animator`;

  // Basic usage example
  const basicUsageCode = `import React from 'react';
import ImageSequenceAnimator from 'react-image-sequence-animator';

function MyComponent() {
  // Array of image URLs to animate
  const imageUrls = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
    // ...more images
  ];

  return (
    <ImageSequenceAnimator
      imageUrls={imageUrls}
      frameRate={10}
      loop={true}
      style={{ maxWidth: '800px' }}
    />
  );
}`;

  // Advanced configuration example
  const advancedUsageCode = `<ImageSequenceAnimator
  imageUrls={imageUrls}
  frameRate={15}
  loop={true}
  className="my-custom-class"
  style={{ maxWidth: '600px' }}
  playbackSpeeds={[0.5, 1, 1.5, 2]} // Custom speeds
/>`;

  // Handle sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${isNavSticky ? 'shadow-md backdrop-blur-sm bg-white/95' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="text-2xl mr-2">🎞️</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">ReactImageSequenceAnimator</span>
          </div>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <a href="#demo" className="text-gray-700 font-medium hover:text-primary-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all">Demo</a>
            <a href="#installation" className="text-gray-700 font-medium hover:text-primary-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all">Installation</a>
            <a href="#docs" className="text-gray-700 font-medium hover:text-primary-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all">Documentation</a>
            <a href="#features" className="text-gray-700 font-medium hover:text-primary-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all">Features</a>
            <a href="https://github.com/your-username/react-image-sequence-animator" className="bg-primary-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-28 pb-16 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="flex items-center justify-center mb-6 animate-pulse">
          <span className="text-5xl mr-3">🎞️</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Image Sequence Animator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A powerful, lightweight React component for animating image sequences
        </p>
      </header>

      {/* Demo Section - Full width with slight background color */}
      <div id="demo" className="py-12 bg-white shadow-sm mb-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">Interactive Demo</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex flex-col min-w-[200px]">
              <label htmlFor="image-count" className="mb-2 font-medium">Image Count: {imageCount}</label>
              <input
                type="range"
                id="image-count"
                min="10"
                max="50"
                value={imageCount}
                onChange={(e) => setImageCount(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col min-w-[200px]">
              <label htmlFor="frame-rate" className="mb-2 font-medium">Frame Rate: {frameRate} FPS</label>
              <input
                type="range"
                id="frame-rate"
                min="1"
                max="15"
                value={frameRate}
                onChange={(e) => setFrameRate(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <ImageSequenceAnimator
              imageUrls={imgURLs}
              frameRate={frameRate}
              loop={true}
              style={{ maxWidth: '100%', margin: '0 auto' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Installation Section */}
          <section id="installation" className="mb-8 lg:mb-0 scroll-mt-24">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">Installation</h2>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} className="code-block rounded-lg">
                {installationCode}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* API Docs Section */}
          <section className="mb-8 lg:mb-0 scroll-mt-24">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">API Documentation</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-3 px-4">Prop</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Default</th>
                      <th className="text-left py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">imageUrls</code></td>
                      <td className="py-3 px-4">string[]</td>
                      <td className="py-3 px-4">Required</td>
                      <td className="py-3 px-4">Array of image URLs to animate</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="py-3 px-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">frameRate</code></td>
                      <td className="py-3 px-4">number</td>
                      <td className="py-3 px-4">30</td>
                      <td className="py-3 px-4">Desired frame rate in frames per second</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">loop</code></td>
                      <td className="py-3 px-4">boolean</td>
                      <td className="py-3 px-4">true</td>
                      <td className="py-3 px-4">Whether the animation should loop</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="py-3 px-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">className</code></td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4">undefined</td>
                      <td className="py-3 px-4">Optional CSS class name for the container</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">style</code></td>
                      <td className="py-3 px-4">React.CSSProperties</td>
                      <td className="py-3 px-4">undefined</td>
                      <td className="py-3 px-4">Optional inline styles for the container</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="py-3 px-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm">playbackSpeeds</code></td>
                      <td className="py-3 px-4">number[]</td>
                      <td className="py-3 px-4">[0.5, 1, 2]</td>
                      <td className="py-3 px-4">Array of available playback speeds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Usage Section - Full width */}
        <section id="docs" className="my-16 scroll-mt-24">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">Basic Usage</h2>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="code-block rounded-lg">
              {basicUsageCode}
            </SyntaxHighlighter>

            <h2 className="text-3xl font-bold mt-10 mb-6 pb-2 border-b border-gray-200">Advanced Configuration</h2>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="code-block rounded-lg">
              {advancedUsageCode}
            </SyntaxHighlighter>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-16 scroll-mt-24">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span>🎮</span> Interactive Controls
                </h3>
                <p className="text-gray-600">Built-in play/pause, previous/next, and speed controls for easy interaction</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span>⌨️</span> Keyboard Navigation
                </h3>
                <p className="text-gray-600">Support for keyboard shortcuts: Space/K (play/pause), J (prev), L (next)</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span>📱</span> Responsive Design
                </h3>
                <p className="text-gray-600">Fully responsive container adapts to any screen size</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span>♿</span> Accessibility
                </h3>
                <p className="text-gray-600">ARIA compliant with screen reader support</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span>🔄</span> Preloading
                </h3>
                <p className="text-gray-600">Smart image preloading with progress indicators</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span>⚡</span> Performance
                </h3>
                <p className="text-gray-600">Optimized for smooth playback even with large image sequences</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8 text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} React Image Sequence Animator - MIT License</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/your-username/react-image-sequence-animator" className="hover:text-primary-500 transition-colors">GitHub</a>
            <a href="https://github.com/your-username/react-image-sequence-animator/issues" className="hover:text-primary-500 transition-colors">Issues</a>
            <a href="https://www.npmjs.com/package/react-image-sequence-animator" className="hover:text-primary-500 transition-colors">NPM</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;