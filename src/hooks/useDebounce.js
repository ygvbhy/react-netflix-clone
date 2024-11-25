import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // delay 시간 이후에 영화 리스트? 를 검색을 시작함.
  // 예를 들어 500ms의 delay를 줬을때
  // 그 사이에 하나의 값이 더 들어온다면 useEffect의 handler 의 clearTimeout으로 이전 값을 초기화 해버림
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
