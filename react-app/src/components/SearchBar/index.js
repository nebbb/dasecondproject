import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../../store/search";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");
  const results = useSelector((state) => Object.values(state.search));

  useEffect(() => {
    const data = { input };
    dispatch(searchResults(data));
  }, [input, dispatch]);

  return (
    <div className="search__bar--container">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="sdnwe-2 r-111h2gw r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        placeholder="Search Twitta"
        autoComplete="off"
        spellcheck="false"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input.length > 1 && results.length > 0 && (
        <div className="search__bar-results--container">
          {results.map((result) => (
            <div
              className="result--single__container"
              onClick={() => {
                history.push(`/profile/${result.id}`);
                setInput("");
              }}
            >
              <div className="result--single__container-left">
                <img src={result?.profile_pic} alt="profile-pic" />
              </div>
              <div className="result--single__container-right">
                <p>{result?.name}</p>
                <span>{`@${result?.username}`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
