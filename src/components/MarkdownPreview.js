import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import clsx from "clsx";
import { useBonadocsStore } from "../store";

export default function LiveMarkdown() {
  const [markdownInput, setMarkdownInput] = useState();
  const [dataKey, setDataKey] = useState("");
  const [preview, setPreview] = useState(false);
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const collection = useBonadocsStore((state) => state.collection);
  const updateDocs = (e) => {
    setMarkdownInput(e.target.value);
    // console.log(dataKey);
    // collection.updateDoc({
    //   key: dataKey,
    //   docText: e.target.value,
    // });
    //console.log(Collection.displayData);
  };

  useEffect(() => {
    setDataKey(getCurrentMethod[1].dataKey);
  }, []);

  return (
    <>
      <button
        className={clsx(
          !preview ? "markdown__heading__active":
          "markdown__heading__md"
        )}
        onClick={() => setPreview(false)}
      >
        Markdown
      </button>
      <button
        className={clsx(
          preview ? "markdown__heading__active":
          "markdown__heading__preview"
        )}
        onClick={() => setPreview(true)}
      >
        Preview
      </button>
      <div className="markdown__container">
        {!preview ? (
          <textarea
            className="markdown__container__editor"
            value={markdownInput}
            placeholder={`Describe "${getCurrentMethod[1].name}"`}
            onChange={(e) => updateDocs(e)}
          />
        ) : (
          <ReactMarkdown
            className="markdown__container__preview"
            children={markdownInput}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code className="markdown__container__code" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        )}
      </div>
    </>
  );
}
