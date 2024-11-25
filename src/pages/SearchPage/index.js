import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState("");

  // 검색한 내용이 주소창에 실시간 변경이 진행 됨.
  // 해당 입력 내용을 가져오는 함수
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if (searchTerm) fetchSeachMovie(searchTerm);
  }, [searchTerm]);

  // 검색한 영화 검색
  const fetchSeachMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResult(request.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>SearchPage</div>;
};

export default SearchPage;
