import React, { useEffect, useState } from 'react';
import './Countdown.css';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-07-04') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <div className="countdown-label">
        {timeLeft.days} | {timeLeft.hours} | {timeLeft.minutes} | {timeLeft.seconds}
      </div>
    </div>
  );
};

export default Countdown;
