import React, { useState, useEffect } from "react";

const Quotes = () => {
  const quotes = [
    "The best way to predict the future is to create it. - Peter Drucker",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
    "Act as if what you do makes a difference. It does. - William James",
    "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
  ];

  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select a random quote on component mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Quote of the Moment</h2>
      <p style={{ fontSize: "1.5rem", fontStyle: "italic" }}>{quote}</p>
    </div>
  );
};

export default Quotes;
