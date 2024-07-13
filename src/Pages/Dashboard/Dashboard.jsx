import React from 'react';
import Weather from '../../components/Weather/Weather';
import News from '../../components/News/News';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="main-container">
      <div className="weather-section">
        <Weather />
      </div>
      <div className="news-section">
        <News />
      </div>
    </div>
  );
}

export default Dashboard;
