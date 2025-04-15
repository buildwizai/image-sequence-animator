import './App.css'
import ImageSequenceAnimator from './ImageSequenceAnimator';

function App() {
  const imgURLs = [];
  for (let i = 1; i <= 100; i++) {
    imgURLs.push(`https://picsum.photos/800/600?random=${i}`);
  }
  return (
    <>
      {/* New ImageSequenceAnimator example */}
      <ImageSequenceAnimator
        imageUrls={imgURLs}
        frameRate={5}
        loop={true}
        style={{ maxWidth: '800px', margin: '2rem auto' }}
      />
    </>
  )
}
export default App
