import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Markdown from "react-markdown";
import Editor from "react-simple-code-editor";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkBreaks from "remark-breaks";
import { GoCodeReview } from "react-icons/go";
import Font from "react-font";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState(`// Paste Your Javascript Or Any Code For Review

`);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false)

  async function reviewCode() {
    setLoading(true)
    let response = await axios.post("https://ai-code-reviewer-backend-yy8k.onrender.com/ai/get-response", {
      code,
    });
    setReview(response.data);
    setLoading(false)
  }

  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <div className="bg-zinc-900 h-screen w-full">
      <div className="heading text-zinc-300 tracking-wide text-[50px] flex justify-center">
        <Font family="Monoton">AI Code Reviewer</Font>
      </div>
      <div className="bg-zinc-900 h-fit w-full p-2 flex gap-2">
        <div className="left border-2 border-zinc-500 bg-zinc-700 h-150 w-1/2 rounded-2xl relative p-4 overflow-auto">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              className="custom-editor font-semibold"
            />
          </div>

          <div className="review top-2 right-2 absolute p-3 border-3 border-zinc-900 bg-zinc-300 text-zinc-900 rounded-xl font-semibold cursor-pointer">
            {loading ? (
              "Reviewing..."
            ) : (
              <span className="flex items-center justify-center gap-1" onClick={reviewCode}>
                <GoCodeReview className="text-xl" />
                Review
              </span>
            )}
          </div>
        </div>
        <div className="right bg-zinc-600 border-2 border-zinc-500 h-150 w-1/2 rounded-2xl pt-2 pb-2 pl-5 overflow-auto font-mono text-zinc-900">
          {review.length === 0 ? (
            <h1 className="font-semibold text-xl tracking-tight p-2">
              {loading ? (
                <div className="text-center animate-pulse text-sm text-gray-900">Analyzing Your Code...</div>
              ) : (
                "🔍 Your Review Will Appear Here After Submitting The Code."
              )}
            </h1>
          ) : (
            <div className="markdown-preview">
              {loading ? (
                <div className="text-center animate-pulse text-sm text-gray-900">Analyzing Your Code...</div>
              ) : (
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
