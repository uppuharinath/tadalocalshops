import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Slider from "react-slick";
import { useSwipeable } from "react-swipeable";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardOut = ({ record, onBack }) => {
  const sliderRef = useRef(null);
  const fullscreenRef = useRef(null);

  // Memoizing the allPhotos array to avoid unnecessary re-renders
  const allPhotos = useMemo(() => [record.bannerimage, ...record.photos.filter((photo) => photo !== record.bannerimage)], [record.bannerimage, record.photos]);

  const [fullscreenData, setFullscreenData] = useState({
    img: null,
    index: null,
    isZoomed: false,
  });

  const imgClick = (photo, index) => {
    setFullscreenData({
      img: photo,
      index,
      isZoomed: false,
    });
    sliderRef.current?.slickPause();
  };

  const navigateImage = useCallback(
    (direction) => {
      if (fullscreenData.index === null) return;
      const total = allPhotos.length;
      const newIndex = direction === "prev"
        ? (fullscreenData.index - 1 + total) % total
        : (fullscreenData.index + 1) % total;
      setFullscreenData({
        img: allPhotos[newIndex],
        index: newIndex,
        isZoomed: false,
      });
    },
    [fullscreenData.index, allPhotos]
  );

  const closeFullscreen = useCallback(() => {
    setFullscreenData({ img: null, index: null, isZoomed: false });
    sliderRef.current?.slickPlay();
  }, []);

  const toggleZoom = useCallback(() => {
    setFullscreenData((prev) => ({ ...prev, isZoomed: !prev.isZoomed }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenData.img) return;

      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape") closeFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenData.img, navigateImage, closeFullscreen]);

  const settings = {
    dots: true,
    infinite: allPhotos.length > 1,
    speed: 500,
    slidesToShow: allPhotos.length > 1 ? 3 : 1,
    slidesToScroll: 1,
    autoplay: allPhotos.length > 1,
    autoplaySpeed: 3000,
  };

  // Swipe handlers for navigating images
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateImage("next"),
    onSwipedRight: () => navigateImage("prev"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="container">
      <div className="row vh-80">
        <div className="col-6-ld box-shadow1 recorddetails">
          <h2 className="text-center white">{record.name}</h2>
          <div className="about">
            <h3 className="white">About</h3>
            <p className="black bg-white">{record.description}</p>
          </div>
          <div className="locate">
            <h3 className="white">Location</h3>
            <p>Route - {record.address} towards {record.towards} Side</p>
            <p>Location: <a className="blue bg-white" href={record.location} target="_blank" rel="noopener noreferrer">View Map</a></p>
          </div>
          <div className="contact white">
            <h3 className="white">Contact</h3>
            <p><a className="contact white" href={`tel:${record.phone}`}>{record.phone}</a></p>
            <p><a href={record.website} target="_blank" rel="noopener noreferrer" className="blue bg-white">{record.website}</a></p>
          </div>
          <div className="open">
            <h3 className="white">Operating Hours</h3>
            <p>{record.open_hours}</p>
          </div>
          {record.specialties?.length > 0 && (
            <div className="specialties">
              <h3 className="white">Specialties</h3>
              {record.specialties.map((item, index) => <p key={index}>{item}</p>)}
            </div>
          )}
          {record.popular_brands?.length > 0 && (
            <div className="popular-brands">
              <h3 className="white">Popular Brands</h3>
              {record.popular_brands.map((brand, index) => <p key={index}>{brand}</p>)}
            </div>
          )}
          {record.services?.length > 0 && (
            <div className="services">
              <h3 className="white">Services</h3>
              {record.services.map((service, index) => (
                <p key={index}>{service.name} ({service.type})</p>
              ))}
            </div>
          )}
          {record.payment_methods?.length > 0 && (
            <div className="payment-methods">
              <h3 className="white">Payment Methods</h3>
              {record.payment_methods.map((method, index) => <p key={index}>{method}</p>)}
            </div>
          )}
          {record.tags?.length > 0 && (
            <div className="tags">
              <h3 className="white">Tags</h3>
              {record.tags.map((tag, index) => <p key={index}>{tag}</p>)}
            </div>
          )}
          {record.parking && (
            <div className="parking">
              <h3 className="white">Parking</h3>
              <p>{record.parking}</p>
            </div>
          )}
          {record.offers && (
            <div className="offers">
              <h3 className="white">Offers</h3>
              <p>{record.offers}</p>
            </div>
          )}
          {record.rating && (
            <div className="rating">
              <h3 className="white">Rating</h3>
              <p>{record.rating} ⭐</p>
            </div>
          )}
        </div>

        <div className="cardoutimages col-6-ld">
          <div className="box-shadow1 bannerimage">
            <img
              src={record.bannerimage}
              alt="Banner"
              onClick={() => imgClick(record.bannerimage, 0)}
            />
          </div>

          <div className="container slideimages">
            <Slider ref={sliderRef} {...settings}>
              {allPhotos.slice(1).map((photo, index) => (
                <div key={index} className="slidingimages">
                  <img
                    src={photo}
                    className="fluid slide-image"
                    id={`photo-${index}`}
                    alt={`${record.name} view ${index + 1}`}
                    onClick={() => imgClick(photo, index + 1)}
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="flex jcc aic text-center m-auto">
        <button
          className={`btn btn-secondary backbutton ${fullscreenData.img ? "d-none" : ""}`}
          onClick={onBack}
        >
          Back
        </button>
      </div>

      {fullscreenData.img && (
        <div
          className="fullscreen"
          onClick={closeFullscreen}
          ref={fullscreenRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          {...swipeHandlers}  // Attach swipe handlers here
        >
          <img
            src={fullscreenData.img}
            alt={`Full view ${fullscreenData.index + 1}`}
            className={fullscreenData.isZoomed ? "zoomed" : "normal"}
            onDoubleClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              objectFit: "contain",
              cursor: fullscreenData.isZoomed ? "zoom-out" : "zoom-in",
              borderRadius: "8px",
              transition: "transform 0.3s ease-in-out",
              transform: fullscreenData.isZoomed ? "scale(1.5)" : "scale(1)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardOut;
