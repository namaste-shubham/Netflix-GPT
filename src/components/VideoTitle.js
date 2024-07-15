const VideoTitle = ({ movieTitle, overview }) => {
  return (
    <div className=" w-screen aspect-video absolute bg-gradient-to-r to-black pt-[20%] px-6 md:px-12 text-white">
      <h1 className="text-xl md:text-3xl font-bold ">{movieTitle}</h1>
      <p className="hidden md:inline-block w-2/6 my-2">{overview}</p>
      <div>
        <button className="bg-white text-lg px-4 md:px-8 py-1 md:py-2 mt-2 rounded-lg text-black hover:bg-opacity-80 cursor-pointer">
          ▶️ Play
        </button>
        <button className="bg-gray-500 hidden md:inline-block text-lg px-8 py-2 mt-2 rounded-lg text-white mx-2 hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
