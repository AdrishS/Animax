import React from "react";
import "./movie.css";

const Movie = ({ imgSrc, imgAlt, largePoster }) => {
  return (
    <div className="movie">
      <img
        className={`movie__poster ${largePoster && "large-poster"} `}
        src={imgSrc}
        alt={imgAlt}
      />
    </div>
  );
};

export default Movie;
