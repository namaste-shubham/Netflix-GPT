import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const data = useSelector((store) => store.language.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-3 m-3 col-span-9"
          placeholder={lang[data].gptSearchPlaceholder}
        ></input>
        <button className="bg-red-700 py-2 px-4 m-3 text-white col-span-3 rounded-lg">
          {lang[data].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
