//import logo from "./logo.svg";
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

  const newQuote = (source) => {
    document.documentElement.style.setProperty(
      "--randomColor",
      getRandomColor()
    );
    const j = Math.floor(Math.random() * 100);
    setCurrentQuote(source[j] ? source[j] : initialQuote);
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

  //////////////////////////////////////////////////////////////////////

  return (
    <div className="app">
      <div id="wrapper">
        <div id="content">
          <p id="quote">
            <i className="fa-solid fa-quote-left" id="quotemark"></i>
            {currentQuote.quote}
          </p>
          <p id="author">- {currentQuote.author}</p>
          <div id="btn-container">
            <button className="btn btn-icon">
              <i className="fa-brands fa-twitter"></i>
            </button>
            <button className="btn btn-icon">
              <i className="fa-brands fa-tumblr"></i>
            </button>
            <button
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
