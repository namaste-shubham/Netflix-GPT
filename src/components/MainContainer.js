import { useSelector } from "react-redux";

import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const backGroundMovie = movies[0];

  const { title, overview, id } = backGroundMovie;

  return (
    <div className="pt-[35%] bg-black md:pt-0">
      <VideoTitle movieTitle={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
