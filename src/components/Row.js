import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";

const Row = ({ title, id, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);

    setMovies(request.data.results);
  };

  return (
    <section className="">
      <h2 className="row">{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <div className="arrow">{"<"}</div>
        </div>

        <div className="row__posters" id={id}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              } `}
              alt={movie.name}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <div className="arrow">{">"}</div>
        </div>
      </div>
    </section>
  );
};

export default Row;
