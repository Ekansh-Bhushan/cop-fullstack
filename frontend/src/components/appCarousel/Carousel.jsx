import { useState } from 'react';
import './Carousel.css';
import copphonescreen1 from '../../assets/copphonescreen1.png';
import copphonescreen2 from '../../assets/copphonescreen2.png';
import copphonescreen3 from '../../assets/copphonescreen3.png';
import copphonescreen4 from '../../assets/copphonescreen4.png';

// this array holds the data for the carousel
const photos = [
  {
    id: 'p1',
    title: '',
    url: copphonescreen1,
  },
  {
    id: 'p2',
    title: '',
    url: copphonescreen2,
  },
  {
    id: 'p3',
    title: '',
    url: copphonescreen3,
  },
  {
    id: 'p4',
    title: '',
    url: copphonescreen4,
  },
];

function Carousel() {
  // show the photo with this index
  const [currentIndex, setCurrentIndex] = useState(0);

  // move to the next photo
  // if we are at the end, go to the first photo
  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  // move to the previous photo
  // if we are at the beginning, go to the last photo
  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Render the carousel */}
      <div className='slider-container'>
        {photos.map((photo) => (
          <div
            key={photo.id}

            // if the photo is the current photo, show it
            className={
              photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'
            }
          >
            <img src={photo.url} alt={photo.title} className='photo' />
            <div className='caption'>{photo.title}</div>
          </div>
        ))}

        {/* Previous button */}
        <button onClick={prev} className='prev'>
          &lt;
        </button>

        {/* Next button */}
        <button onClick={next} className='next'>
          &gt;
        </button>
      </div>

      {/* Render dots indicator */}
      <div className='dots'>
        {photos.map((photo) => (
          <span
            key={photo.id}
            // highlight the dot that corresponds to the current photo
            className={
              photos[currentIndex].id === photo.id ? 'dot activeDot' : 'dot'
            }
            // when the user clicks on a dot, go to the corresponding photo
            onClick={() => setCurrentIndex(photos.indexOf(photo))}
          ></span>
        ))}
      </div>
    </>
  );
}

export default Carousel;