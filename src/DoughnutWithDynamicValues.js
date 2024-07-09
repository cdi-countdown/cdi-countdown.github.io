// src/DoughnutWithDynamicValues.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutWithDynamicValues = () => {
  const initialData = {
    Paris: 20,
    Turin: 20,
    Munich: 25,
    "Online seminars": 12,
    Heilbronn: 5,
    Mission: 124,
    Vacation: 4,
    "Non-working days": 94
  };

  const [data, setData] = useState(initialData);

  // useEffect(() => {
  //   const today = new Date();
  //   const currentDate = today.getDate();
  //   const currentMonth = today.getMonth();
  //   const currentYear = today.getFullYear();

  //   if (currentYear === 2024) {
  //     const updatedData = { ...initialData };

  //     if (currentMonth === 5) { // June 2024
  //       // Add +1 for Mission on June 19, 20, 21
  //       if (currentDate >= 19 && currentDate <= 21) {
  //         updatedData.Mission += 1;
  //       }

  //       // Add +1 for Non-working days for June 22, 23
  //       if (currentDate >= 22 && currentDate <= 23) {
  //         updatedData["Non-working days"] += 1;
  //       }

  //       // Add +1 for Paris for June 24, 25, 26, 27, 28
  //       if (currentDate >= 24 && currentDate <= 28) {
  //         updatedData.Paris += 1;
  //       }

  //       // Add +1 for Non-working days for June 29, 30
  //       if (currentDate >= 29 && currentDate <= 30) {
  //         updatedData["Non-working days"] += 1;
  //       }
  //     }

  //     if (currentMonth === 6) { // July 2024
  //       // Add +1 for Vacation for July 1 to 5
  //       if (currentDate >= 1 && currentDate <= 5) {
  //         updatedData.Vacation += 1;
  //       }

  //       // Add +1 for Non-working days for July 6, 7
  //       if (currentDate >= 6 && currentDate <= 7) {
  //         updatedData["Non-working days"] += 1;
  //       }

  //       // Add +1 for Vacation for July 8 to 12
  //       if (currentDate >= 8 && currentDate <= 12) {
  //         updatedData.Vacation += 1;
  //       }
  //     }

  //     setData(updatedData);
  //   }
  // }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF5733',
          '#3357FF',
          '#FF33A2',
          '#A233FF',
          '#FF8F33'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF5733',
          '#3357FF',
          '#FF33A2',
          '#A233FF',
          '#FF8F33'
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 14
          },
          color: 'white'
        }
      },
      tooltip: {
        enabled: true
      }
    },
    cutout: '60%',
  };

  return (
    <div className="doughnut-chart-container">
      <div className="doughnut-chart2">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutWithDynamicValues;

