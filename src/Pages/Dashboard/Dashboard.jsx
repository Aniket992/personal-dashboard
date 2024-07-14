import React from 'react';
import Weather from '../../components/Weather/Weather';
import News from '../../components/News/News';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <>
    <h1>Welcome to Dashboard!</h1>
    <div className="main-container">

 <div className="news-section">
        <News />
      </div>
      <div className="weather-section">
        <Weather />
      </div>
     
    </div>
    </>

  );
}

export default Dashboard;
