import React, { useState, useRef, useEffect, useMemo } from "react";
import Slider from "react-slick";

const HomeBanner = () => {
  const [fullscreenData, setFullscreenData] = useState({
    img: null,
    index: null,
    isOriginalSize: false
  });
  const sliderRef = useRef();
  const fullscreenRef = useRef();

  const items = useMemo(() => {
    const ctx = require.context("../../marriage", false, /\.(jpg|jpeg|png|gif)$/i);
    return ctx.keys().map((path, index) => ({
      img: ctx(path).default || ctx(path),
      name: path.replace('./', ''),
      index
    }));
  }, []);

  const imgClick = (item) => {
    setFullscreenData({
      img: item.img,
      index: item.index,
      isOriginalSize: false
    });
    sliderRef.current?.slickPause();
  };

  const closeFullscreen = () => {
    setFullscreenData({
      img: null,
      index: null,
      isOriginalSize: false
    });
    sliderRef.current?.slickPlay();
  };

  const navigateImage = (direction) => {
    if (fullscreenData.index === null) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = (fullscreenData.index - 1 + items.length) % items.length;
    } else {
      newIndex = (fullscreenData.index + 1) % items.length;
    }

    setFullscreenData({
      img: items[newIndex].img,
      index: newIndex,
      isOriginalSize: false
    });
  };

  const toggleOriginalSize = () => {
    setFullscreenData(prev => ({
      ...prev,
      isOriginalSize: !prev.isOriginalSize
    }));
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenData.img) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          closeFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenData]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index} className="w-100 main-images ">
            <img
              src={item.img}
              className={`fluid slide-image ${fullscreenData.img === item.img ? 'active-slide' : ''}`}
              id={`item${index}`}
              alt={`Wedding photo ${index + 1}`}
              onClick={() => imgClick(item)}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>

      {fullscreenData.img && (
        <div 
          className="fullscreen" 
          onClick={closeFullscreen}
          ref={fullscreenRef}
        >
          <img 
            src={fullscreenData.img} 
            alt={`Wedding photo ${fullscreenData.index + 1}`}
            className={fullscreenData.isOriginalSize ? 'original-size' : 'fit-screen'}
            onDoubleClick={(e) => {
              e.stopPropagation();
              toggleOriginalSize();
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default HomeBanner ;