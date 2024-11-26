import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState("");

  // 검색한 내용이 주소창에 실시간 변경이 진행 됨.
  // 해당 입력 내용을 가져오는 함수
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) fetchSeachMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // 검색한 영화 검색
  // 이벤트가 타이핑 할때마다 요청을 해서 성능 저하가 생길 수 있음
  const fetchSeachMovie = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      );
      setSearchResult(request.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSearchResults = () => {
    return searchResult.length > 0 ? (
      <section className="search-container">
        {searchResult.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div onClick={() => navigate(`/${movie.id}`)} className="movie__column-poster">
                  <img
                    src={movieImageUrl}
                    alt="이미지"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
          return false;
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
};

export default SearchPage;
