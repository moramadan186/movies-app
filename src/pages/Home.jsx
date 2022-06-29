import React from "react";
import MovieList from "../components/movies-list/MovieList";
import HeroSlide from "./../components/hero-slide/HeroSlide";
import { category, movieType, tvType } from "./../api/tmdbApi";
import { Link } from "react-router-dom";
import { OutlineButton } from "./../components/button/Button";

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3 ">
          <div className="section_header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList cat={category.movie} type={movieType.popular} />
        </div>
        <div className="section mb-3 ">
          <div className="section_header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList cat={category.movie} type={movieType.top_rated} />
        </div>
        <div className="section mb-3 ">
          <div className="section_header mb-2">
            <h2>Trending Tv</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList cat={category.tv} type={tvType.popular} />
        </div>
        <div className="section mb-3 ">
          <div className="section_header mb-2">
            <h2>Top Rated Tv</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList cat={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Home;
