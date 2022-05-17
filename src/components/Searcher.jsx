import { useState } from "react";
import TextInput from "./TextInput";
import { useEffect } from "react";

const REQUEST_TIME = 500;

function Searcher({ content }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState();

  let declaredTimeout;

  const searchDelay = (e) => {
    clearTimeout(declaredTimeout);
    declaredTimeout = setTimeout(() => {
      console.log(e.target.value);
      setInput(e.target.value);
      if (loading) setLoading(false);
    }, REQUEST_TIME);
  };

  const menuNavigation = (e) => {
    let newSelected = selected;

    if (e.key === "ArrowDown" && selected < 9) setSelected(newSelected + 1);
    if (e.key === "ArrowUp" && selected >= 0) setSelected(newSelected - 1);

    if (e.key === "Enter") queryArticle(selected < 0 ? 0 : selected);
  };

  const queryArticle = (index) => {
    const articleName = entries[3][index].split("/");

    setLoading(true);

    if (input) {
      fetch(
        `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=revisions&titles=${
          articleName[articleName.length - 1]
        }&formatversion=2&origin=*&rvprop=content&rvslots=*&prop=extracts`
      )
        .then((response) => response.json())
        .then((response) => {
          content(response.query.pages[0].extract);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (input) {
      fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${input}`
      )
        .then((response) => response.json())
        .then((response) => {
          setEntries(response);
          setSelected(-1);
        });
    }
  }, [input]);

  return (
    <div style={{ position: "relative" }}>
      <TextInput updater={searchDelay} navigation={menuNavigation} />
      {loading ? <div className="loader"></div> : null}
      {input && entries ? (
        <ul className="search-results">
          {[...entries[1]].map((entry, index) => (
            <li
              key={index}
              onClick={() => queryArticle(index)}
              className={selected === index ? "selected" : null}
            >
              {entry}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Searcher;
