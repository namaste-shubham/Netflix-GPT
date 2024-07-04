import { useSelector } from "react-redux";

import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  console.log(movies);
  if (!movies) return;
  const backGroundMovie = movies[8];

  const { title, overview, id } = backGroundMovie;

  return (
    <div>
      <VideoTitle movieTitle={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
