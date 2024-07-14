import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState("in");
  const [category, setCategory] = useState("general");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.worldnewsapi.com/top-news?api-key=274588acd8674921a9c38691909d0493&source-country=${country}&language=en&category=${category}`
      );

      const topNews = response.data.top_news.map(item => item.news[0]);
      setNews(topNews);
    } catch (error) {
      setError('Failed to fetch news data');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFetchNews = () => {
    fetchNews();
  };

  const handleRedirectToNews = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="news-container">
      <h1>Top News Headlines</h1>
      <div className="input-container">
        <label className="news-label">
          Enter country name:
          <input
            type="text"
            value={country}
            onChange={handleCountryChange}
            placeholder="Enter country code"
            className="news-input"
          />
        </label>
        
        <label className="news-label">
          Select category:
          <select
            value={category}
            onChange={handleCategoryChange}
            className="news-select"
          >
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </label>
        <button onClick={handleFetchNews} className="fetch-news-btn">
          Fetch News
        </button>
      </div>
      {loading && <div className="loader">Loading...</div>}
      {error && <p className="error-message">Failed to fetch news data</p>}
      <div className="news-grid">
        {news.length === 0 ? (
          <p>No news found</p>
        ) : (
          news.map((item, index) => (
            <div
              key={index}
              className="news-card"
              onClick={() => handleRedirectToNews(item.url)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2 className="news-title">{item.title}</h2>
                <p className="news-source">Source/Author: {item.author}</p>
                <p className="news-publish-date">Published on: {item.publish_date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
