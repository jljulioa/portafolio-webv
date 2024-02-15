import { fetchApi } from "./JS/fetchApi";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useState } from "react";
import { RxDotFilled } from 'react-icons/rx';

function AppSlides() {

    const { data, loading } = fetchApi();

    const slides = data.urls.slice(0, 5)

    console.log(slides)

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (<div className='max-w-[800px] h-[780px] w-full m-auto py-16 px-4 relative group'>
    <div
      style={{ backgroundImage: `url(${slides[currentIndex].signedUrl})` }}
      className='w-full h-full ring-4 ring-blue-700 dark:ring-[#665fcc] rounded-2xl bg-center bg-cover duration-500'
    ></div>
    {/* Left Arrow */}
    <div className=' absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactLeft onClick={prevSlide} size={30} />
    </div>
    {/* Right Arrow */}
    <div className=' absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactRight onClick={nextSlide} size={30} />
    </div>
    <div className='flex top-4 justify-center py-2'>
      {slides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
          className='text-2xl text-white cursor-pointer'
        >
          <RxDotFilled />
        </div>
      ))}
    </div>
  </div>
);
}
export default AppSlides;