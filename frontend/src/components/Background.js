import React, { useEffect, useState } from 'react';
import './Background.css';

const Background = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          delay: Math.random() * 3,
          duration: Math.random() * 4 + 2
        });
      }
      setStars(newStars);
    };

    createStars();
  }, []);

  return (
    <div className="background-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;
