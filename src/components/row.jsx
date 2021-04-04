import React, { useEffect, useState } from "react";
import http from "./../services/axiosHttp";
import Movie from "./movie";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./row.css";

const Row = ({ title, fetchUrl, largePoster }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const imgBaseUrl = "https://image.tmdb.org/t/p/original/";
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await http.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  async function handleClick(m) {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      await movieTrailer(m.title || m.original_title || m.name)
        .then((res) => {
          const urlParams = new URLSearchParams(new URL(res).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className={`row__container ${largePoster && "row__large"} `}>
        {movies.map((m) => (
          <span key={m.id} onClick={() => handleClick(m)}>
            <Movie
              imgSrc={imgBaseUrl + m.poster_path}
              imgAlt={m.name}
              largePoster={largePoster}
            />
          </span>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
