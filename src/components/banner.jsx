import React, { useEffect, useState } from "react";
import requests from "../services/requests";
import http from "./../services/axiosHttp";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetchMovie() {
      const request = await http.get(requests.fetchNetflixOriginals);
      const random = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[random]);
    }
    fetchMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {" "}
          {movie?.title || movie?.name || movie?.original_name}{" "}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button"> Play </button>
          <button className="banner__button"> My List </button>
        </div>
        <div className="banner__desc">
          <p>{truncate(movie?.overview, 200)}</p>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </div>
  );
};

export default Banner;
