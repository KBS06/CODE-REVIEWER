import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"; {/**For highlighting code in the app*/ }
import Editor from "react-simple-code-editor"; {/**provides a lightweight, syntax-highlightable code editor that you can embed in your UI.*/ }
import Markdown from "react-markdown"; {/** allows you to render Markdown text as HTML in React. It's used to show the review response from the backend (which may include markdown formatting like headings, lists, code blocks, etc.).*/ }
import rehypeHighlight from "rehype-highlight";{/**This plugin works with react-markdown to highlight code blocks automatically within markdown content using highlight.js. */}
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum(){
  return 1+1
}`)
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, [review])

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/get-review`, { code });
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Error fetching review.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className='left'>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }} />
          </div>
          <div onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className='right'>
          {loading ? <p>⏳ Reviewing your code...</p> : null}
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App
