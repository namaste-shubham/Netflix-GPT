import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import {
  NETFLIX_LOGO,
  SUPPORTED_LANGUAGE,
  USER_LOGO,
} from "../utils/constants";
import { clearGptMovies, toggleGptSearchView } from "../utils/gptSlice";
import { languageChange } from "../utils/languageSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //Sign In or Sign Up
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // Sign out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unmount
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    dispatch(clearGptMovies());
  };

  const handleLanguageChange = (e) => {
    dispatch(languageChange(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between  ">
      <img
        className="w-44 mx-auto md:mx-0"
        src={NETFLIX_LOGO}
        alt="netfix-logo"
      />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-3 bg-gray-900 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="p-2 m-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-12 h-12 m-2"
            src={USER_LOGO}
            alt="user_icon"
          />
          <button onClick={handleSignOut} className="text-white font-bold">
            {" "}
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
