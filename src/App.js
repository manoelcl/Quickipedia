import { useState } from "react";
import "./App.css";
import Searcher from "./components/Searcher";
import parse from "html-react-parser";

function App() {
  const [pageContent, setPageContent] = useState();
  const getContent = (content) => {
    setPageContent(content);
  };

  return (
    <div className="App">
      <header>
        <h1>Quickipedia</h1>
        <Searcher content={getContent}></Searcher>
      </header>

      <main>{pageContent ? parse(pageContent) : ""}</main>
    </div>
  );
}

export default App;
