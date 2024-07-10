import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
// import useSearchMovies from "../hooks/useSearchMovies";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.language.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearchBarClick = async () => {
    const gptQuery =
      "Act as a movie recomendation system and suggest some movies for the query: " +
      searchText.current.value +
      "only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar,Don,Sholay,Golmaal,Koi Mil Gya";

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptMovies = chatCompletion.choices[0].message.content.split(","); // array of movies name from gpt result

    // for each movie i will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-3 m-3 col-span-9"
          placeholder={lang[data].gptSearchPlaceholder}
        ></input>
        <button
          onClick={handleSearchBarClick}
          className="bg-red-700 py-2 px-4 m-3 text-white col-span-3 rounded-lg"
        >
          {lang[data].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
