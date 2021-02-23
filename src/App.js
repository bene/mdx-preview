import React, { useState, useEffect } from "react";
import mdx from "@mdx-js/mdx";
import Editor from "@monaco-editor/react";
import MDX from "@mdx-js/runtime";

function setURLParameter(key, value) {
  const url = new URL(document.location);
  url.searchParams.set(key, value);
  window.history.replaceState(null, null, "?" + url.searchParams.toString());
}

function App() {
  const [valid, setIsValid] = useState(true);
  const [value, setValue] = useState(
    new URL(window.location).searchParams.get("code")
  );
  const [result, setResult] = useState("");

  useEffect(() => {
    mdx(value)
      .then((_) => {
        if (!valid) {
          setIsValid(true);
        }
        setResult(value);
        setURLParameter("code", value);
      })
      .catch(() => {
        setIsValid(false);
      });
  }, [valid, value, setResult]);

  return (
    <div className="d-flex h-100 flex-row bg-dark">
      <div className="col-5">
        <Editor
          defaultLanguage="markdown"
          height="100%"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          theme="vs-dark"
        />
      </div>
      <div className="col-7 d-flex flex-column p-3">
        <div className="flex-grow-1 bg-white p-5 shadow rounded overflow-y-scroll">
          <MDX>{result}</MDX>
        </div>
      </div>
    </div>
  );
}

export default App;
