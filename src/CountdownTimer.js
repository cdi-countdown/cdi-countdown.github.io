import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Countdown from 'react-countdown';
import DoughnutChart from './DoughnutChart';
import DoughnutWithDynamicValues from './DoughnutWithDynamicValues';
import './App.css';
import cdiImage from './cdi.png';

const CountdownTimer = () => {
  const startDate = useMemo(() => new Date('2024-01-09T09:00:00+01:00'), []);
  const endDate = useMemo(() => new Date('2024-11-08T15:00:00+01:00'), []);
  const [completionRate, setCompletionRate] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [daysLapsed, setDaysLapsed] = useState(0);

  const calculateCompletionRate = useCallback(() => {
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const completedDuration = now.getTime() - startDate.getTime();
    const rate = (completedDuration / totalDuration) * 100;
    return rate;
  }, [endDate, startDate]);

  const calculateDaysLapsed = useCallback(() => {
    const now = new Date();
    const completedDuration = now.getTime() - startDate.getTime();
    const days = Math.floor(completedDuration / (1000 * 60 * 60 * 24));
    return days;
  }, [startDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = calculateCompletionRate();
      setCompletionRate(newRate);

      const newDaysLapsed = calculateDaysLapsed();
      setDaysLapsed(newDaysLapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateCompletionRate, calculateDaysLapsed]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>CDI has ended!</span>;
    } else {
      const totalHours = Math.floor((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((endDate.getTime() - new Date().getTime()) / (1000 * 60));
      const totalSeconds = Math.floor((endDate.getTime() - new Date().getTime()) / 1000);

      const day = endDate.getDate();
      const month = endDate.toLocaleDateString('en-GB', { month: 'long' });
      const year = endDate.getFullYear();
      const formattedEndDate = `${day} ${month} ${year}`;

      const formattedEndTime = endDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <div>
          <h1>CDI for January 24 Intake will end in</h1>
          <div className="countdown">
            {days} days {hours} hours {minutes} minutes {seconds} seconds
          </div>
          <div className="additional-countdowns">
            <div>or about {totalHours} hours</div>
            <div>or about {totalMinutes} minutes</div>
            <div>or about {totalSeconds} seconds</div>
            <h2>on {formattedEndDate} at {formattedEndTime}</h2>
          </div>
          <div className="doughnut-container">
            <div className="doughnut-wrapper">
              <h3>Completion Rate</h3>
              <div className="completion-rate">
                {completionRate.toFixed(3)}%
              </div>
              <DoughnutChart completionRate={completionRate} />
            </div>
            <div className="doughnut-wrapper">
              <h3>Days Lapsed</h3>
              <div className="completion-rate">
                {daysLapsed} / 304 days
              </div>
              <DoughnutWithDynamicValues />
            </div>
          </div>
          <div className="footer">
            <button
              className="info-button"
              onClick={() => setShowInfo(!showInfo)}
            >
              Info
            </button>
          </div>
          <div className={`info-message ${showInfo ? 'show' : ''}`}>
            This webpage has been created from scratch by GP with the help of GenAI. It was modified by LU.
          </div>
        </div>
      );
    }
  };

  return (
    <Countdown date={endDate} renderer={renderer} />
  );
};

export default CountdownTimer;

