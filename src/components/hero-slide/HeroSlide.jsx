import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import Modal, { ModalContent } from "../modal/Modal";
import apiConfig from "./../../api/apiConfig";
import tmdbApi, { movieType, category } from "./../../api/tmdbApi";
import "./hero-slide.scss";
import Button, { OutlineButton } from "./../button/Button";
const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        console.log(response.results);
        setMovieItems(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={{ Autoplay }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 5000 }}
        loop={true}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  const navigate = useNavigate();
  const movie_background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const getMovieTrailerVideo = async () => {
    console.log(item.id);
    const currentModal = document.querySelector(`#modal_${item.id}`);
    console.log(currentModal);
    try {
      const videos = await tmdbApi.getVideos(category.movie, item.id);
      if (videos.results.length > 0) {
        currentModal.querySelector(".modal__content").innerHTML = `
          <iframe
            width="100%"
            height="500px"
            title="trailer"
            src="https://www.youtube.com/embed/${videos.results[0].key}"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        `;
        currentModal.classList.toggle("active");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${movie_background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () => (iframeRef.current.src = "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};
export default HeroSlide;
