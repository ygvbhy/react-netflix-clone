import React, { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

const Row = ({ title, id, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const fetchMovieData = useCallback(async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="">
      <h2 className="row">{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <div
            className="arrow"
            onClick={() =>
              (document.getElementById(id).scrollLeft -= window.innerWidth)
            }
          >
            {"<"}
          </div>
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
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <div
            className="arrow"
            onClick={() =>
              (document.getElementById(id).scrollLeft += window.innerWidth)
            }
          >
            {">"}
          </div>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
