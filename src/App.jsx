import { useState } from 'react';
import { marked } from 'marked';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ImageSequenceAnimator from './ImageSequenceAnimator';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

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

  // Code examples
  const basicExample = `import React from 'react';
import ImageSequenceAnimator from 'image-sequence-animator';

const MyComponent = () => {
  // Array of image URLs
  const imageUrls = [
    'https://example.com/frame1.jpg',
    'https://example.com/frame2.jpg',
    'https://example.com/frame3.jpg',
    // ... more frames
  ];

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
  // Generate frames from a product rotation sequence
  const imageUrls = Array.from(
    { length: 36 },
    (_, i) => \`/product-views/product_\${String(i + 1).padStart(2, '0')}.jpg\`
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

  // Installation instructions
  const installation = `# Using npm
npm install image-sequence-animator

# Using yarn
yarn add image-sequence-animator

# Using pnpm
pnpm add image-sequence-animator`;

  // README content
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
`;

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Image Sequence Animator</h1>
        <p className="tagline">
          A powerful React component for animating sequences of images with fine-grained control
        </p>
        <div className="badges">
          <img src="https://img.shields.io/npm/v/image-sequence-animator.svg" alt="npm version" />
          <img src="https://img.shields.io/npm/dm/image-sequence-animator.svg" alt="downloads" />
          <img src="https://img.shields.io/github/license/luongnv89/image-sequence-animator" alt="license" />
        </div>
      </header>

      <nav className="main-nav">
        <ul>
          <li className={tabIndex === 0 ? 'active' : ''} onClick={() => setTabIndex(0)}>Demo</li>
          <li className={tabIndex === 1 ? 'active' : ''} onClick={() => setTabIndex(1)}>Installation</li>
          <li className={tabIndex === 2 ? 'active' : ''} onClick={() => setTabIndex(2)}>Documentation</li>
          <li className={tabIndex === 3 ? 'active' : ''} onClick={() => setTabIndex(3)}>Examples</li>
        </ul>
      </nav>

      <main>
        {/* Demo Section */}
        {tabIndex === 0 && (
          <section className="demo-section">
            <h2>Interactive Demos</h2>
            <p>Try out these examples of the Image Sequence Animator component with different configurations:</p>

            <div className="demo-grid">
              {demoConfigs.map((config, idx) => (
                <div key={idx} className="demo-item">
                  <h3>{config.title}</h3>
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
                  <div className="demo-config">
                    <code>frameRate: {config.frameRate}, loop: {config.loop.toString()}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Installation Section */}
        {tabIndex === 1 && (
          <section className="installation-section">
            <h2>Installation</h2>
            <p>Add Image Sequence Animator to your React project:</p>
            <SyntaxHighlighter language="bash" style={docco}>
              {installation}
            </SyntaxHighlighter>

            <h3>Requirements</h3>
            <ul>
              <li>React 16.8+ (uses React Hooks)</li>
              <li>Compatible with React 18 and 19</li>
            </ul>
          </section>
        )}

        {/* Documentation Section */}
        {tabIndex === 2 && (
          <section className="docs-section">
            <div dangerouslySetInnerHTML={{ __html: marked.parse(readmeContent) }} />

            <h2>Props</h2>
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>imageUrls</code></td>
                  <td><code>string[]</code></td>
                  <td><strong>Required</strong></td>
                  <td>Array of image URLs to animate</td>
                </tr>
                <tr>
                  <td><code>frameRate</code></td>
                  <td><code>number</code></td>
                  <td><code>30</code></td>
                  <td>Desired frame rate in frames per second</td>
                </tr>
                <tr>
                  <td><code>loop</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether the animation should loop back to the start</td>
                </tr>
                <tr>
                  <td><code>playbackSpeeds</code></td>
                  <td><code>number[]</code></td>
                  <td><code>[0.5, 1, 2]</code></td>
                  <td>Array of available playback speed multipliers</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Optional CSS class name for the container</td>
                </tr>
                <tr>
                  <td><code>style</code></td>
                  <td><code>React.CSSProperties</code></td>
                  <td><code>undefined</code></td>
                  <td>Optional inline styles for the container</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* Examples Section */}
        {tabIndex === 3 && (
          <section className="examples-section">
            <h2>Code Examples</h2>

            <div className="example">
              <h3>Basic Example</h3>
              <p>A simple implementation with minimal configuration:</p>
              <SyntaxHighlighter language="jsx" style={docco}>
                {basicExample}
              </SyntaxHighlighter>
            </div>

            <div className="example">
              <h3>Advanced Example</h3>
              <p>Product 360° viewer with custom styling and extended controls:</p>
              <SyntaxHighlighter language="jsx" style={docco}>
                {advancedExample}
              </SyntaxHighlighter>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>
          <a href="https://github.com/luongnv89/image-sequence-animator" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a> |
          <a href="https://www.npmjs.com/package/image-sequence-animator" target="_blank" rel="noopener noreferrer">
            NPM Package
          </a>
        </p>
        <p className="copyright">© {new Date().getFullYear()} Image Sequence Animator - MIT License</p>
      </footer>

      <style jsx>{`
        :root {
          --primary-color: #3498db;
          --secondary-color: #2ecc71;
          --dark-color: #2c3e50;
          --light-color: #ecf0f1;
          --text-color: #333;
          --border-color: #ddd;
        }

        .landing-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: var(--text-color);
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .tagline {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .badges {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .badges img {
          height: 20px;
        }

        .main-nav ul {
          display: flex;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin: 2rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .main-nav li {
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .main-nav li:hover {
          color: var(--primary-color);
        }

        .main-nav li.active {
          border-bottom: 2px solid var(--primary-color);
          color: var(--primary-color);
          font-weight: bold;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .demo-item {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          padding-bottom: 1rem;
        }

        .demo-item h3 {
          padding: 1rem;
          margin: 0;
          background-color: var(--light-color);
        }

        .demo-config {
          padding: 0.5rem;
          margin-top: 1rem;
          text-align: center;
        }

        .props-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }

        .props-table th,
        .props-table td {
          padding: 0.75rem;
          border: 1px solid var(--border-color);
        }

        .props-table th {
          background-color: var(--light-color);
          text-align: left;
        }

        .example {
          margin-bottom: 2rem;
        }

        footer {
          margin-top: 3rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          text-align: center;
        }

        footer a {
          color: var(--primary-color);
          text-decoration: none;
          margin: 0 0.5rem;
        }

        footer a:hover {
          text-decoration: underline;
        }

        .copyright {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #777;
        }
      `}</style>
    </div>
  )
}

export default App;
