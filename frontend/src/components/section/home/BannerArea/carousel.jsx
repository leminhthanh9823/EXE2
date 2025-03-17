import { useState } from "react";

export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative w-3/4 mx-auto mt-10 rounded-lg shadow-lg bg-white">
      <div
        className={`flex transition-transform ease-in-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((s, index) => {
          return (
            <div key={index} className="w-full flex-shrink-0">
              <img src={s} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
            </div>
          );
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-4 text-2xl">
        <button onClick={previousSlide} className="bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
          <i className="fas fa-arrow-left"></i>
        </button>
        <button onClick={nextSlide} className="bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <div className="absolute bottom-0 py-2 flex justify-center gap-2 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
