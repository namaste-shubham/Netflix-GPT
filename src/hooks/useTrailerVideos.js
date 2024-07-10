import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideos } from "../utils/moviesSlice";

const useTrailerVideos = (movieId) => {
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const dispatch = useDispatch();
  const getTrailerVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();
    const filteredVideo = data.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredVideo.length ? filteredVideo[1] : data.results[0];
    dispatch(addTrailerVideos(trailer));
  };

  useEffect(() => {
    if (!trailerVideo) {
      getTrailerVideos();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]); // Depend on movieId to re-fetch when it changes
};

export default useTrailerVideos;
