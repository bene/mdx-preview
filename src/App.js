import React, { useState, useEffect } from "react";
import mdx from "@mdx-js/mdx";
import Editor from "@monaco-editor/react";
import MDX from "@mdx-js/runtime";

function App() {
  const [valid, setIsValid] = useState(true);
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    mdx(value)
      .then((_) => {
        setIsValid(true);
        setResult(value);
      })
      .catch(() => {
        setIsValid(false);
      });
  }, [value, setResult]);

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
        <div className="mb-3 bg-white p-5 shadow rounded overflow-y-scroll">
          sad
        </div>
        <div className="flex-grow-1 bg-white p-5 shadow rounded overflow-y-scroll">
          <MDX>{result}</MDX>
        </div>
      </div>
    </div>
  );
}

export default App;
