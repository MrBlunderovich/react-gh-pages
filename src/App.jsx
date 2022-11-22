import "./fontawesome/css/fontawesome.css";
import "./fontawesome/css/solid.css";
import "./fontawesome/css/brands.css";
import React from "react";

function App() {
  const getRandomColor = () => {
    const i = Math.floor(Math.random() * 10);
    const palette = [
      "#e74c3c",
      "#73a857",
      "#f39c12",
      "#9b59b6",
      "#fb6964",
      "#2c3e50",
      "#16a085",
      "#27ae60",
      "#f39c12",
      "#342224",
    ];
    return palette[i];
  };
  const initialQuote = {
    quote: "loading...",
    author: "loading...",
  };

  const [quotesArray, setQuotesArray] = React.useState([]);
  const [currentQuote, setCurrentQuote] = React.useState(initialQuote);

  const opacitor = (opacity) => {
    document.getElementById("quote").style.setProperty("opacity", opacity);
    document.getElementById("author").style.setProperty("opacity", opacity);
  };

  const newQuote = (source) => {
    opacitor(0);
    document.documentElement.style.setProperty(
      "--randomColor",
      getRandomColor()
    );
    setTimeout(() => {
      const j = Math.floor(Math.random() * 100);
      setCurrentQuote(source[j] ? source[j] : initialQuote);
    }, 500);
  };

  React.useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuotesArray(data.quotes);
        newQuote(data.quotes);
      });
  }, []);
  React.useEffect(() => {
    opacitor(1);
  }, [currentQuote]);

  return (
    <div className="app">
      <div id="wrapper">
        <div id="quote-box">
          <p id="quote" className="opacitor">
            <i className="fa-solid fa-quote-left" id="quotemark"></i>
            <span id="text">{currentQuote.quote}</span>
          </p>
          <p id="author" className="opacitor">
            - {currentQuote.author}
          </p>
          <div id="btn-container">
            <a
              href="https://twitter.com/intent/tweet/"
              target="_blank"
              rel="noreferer noopener"
              className="btn btn-icon"
              id="tweet-quote"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <button
              id="new-quote"
              className="btn btn-new-q"
              onClick={() => newQuote(quotesArray)}
            >
              New quote
            </button>
          </div>
        </div>
        <div id="footer">
          <p id="link">the link</p>
        </div>
      </div>
    </div>
  );
}

export default App;
