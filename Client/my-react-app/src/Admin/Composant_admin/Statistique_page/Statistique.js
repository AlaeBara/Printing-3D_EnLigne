import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Statistique.css';
import Revieve from './recieve.png';
import Confirmed from './confirmed.png';
import Completed from './completed.png';
import Messages from './messages.png';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Statistique = () => {
  const [statistics, setStatistics] = useState({
    prêt: 0,
    enCours: 0,
    finDeImpression: 0,
    messageCount: 0,
    totalPriceOrderComplete: 0,
    totalOrdersPrice: 0,
    averageTimeDifference: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.post('http://localhost:8000/statistics');
        const data = response.data;
        setStatistics({
          prêt: data.printerStatusCounts.prêt,
          enCours: data.printerStatusCounts.enCours,
          finDeImpression: data.printerStatusCounts.finDeImpression,
          messageCount: data.messageCount,
          totalPriceOrderComplete: data.finDeImpressionPriceSum,
          totalOrdersPrice: data.totalOrdersPrice,
          averageTimeDifference: data.averageTimeDifference,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStatistics();
  }, []);

  // Function to convert milliseconds to a readable format
  const convertMillisecondsToReadableTime = (ms) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  const readableAverageTime = convertMillisecondsToReadableTime(statistics.averageTimeDifference);

  const chartData = {
    labels: ['Total des commandes reçues', 'Total des commandes confirmées', 'Total des commandes traitées'],
    datasets: [
      {
        label: 'Statistics',
        data: [statistics.prêt, statistics.enCours, statistics.finDeImpression],
        backgroundColor: ['rgb(254, 185, 65)', 'rgb(255, 159, 102)', 'rgb(255, 95, 0)'],
        borderColor: ['rgb(254, 185, 65)', 'rgb(255, 159, 102)', 'rgb(255, 95, 0)'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Prix total des commandes Fin d’impression", "restant"],
    datasets: [
      {
        data: [statistics.totalPriceOrderComplete, Math.max(0, statistics.totalOrdersPrice - statistics.totalPriceOrderComplete)],
        backgroundColor: ['rgb(254, 185, 65)', 'rgb(255, 95, 0)'],
      },
    ],
  };

  const lineChartData = {
    labels: ['Temps moyen '],
    datasets: [
      {
        label: "Temps moyen entre la date envoyer et la date de résiliation (en jours)",
        data: [statistics.averageTimeDifference / (24 * 60 * 60 * 1000)], // Convert ms to days
        backgroundColor: ['rgb(75, 192, 192)'],
        borderColor: ['rgb(75, 192, 192)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="statistique-container">
        <div className="statistique-item first-item">
          <div className="statistique-content">
            <img className="statistique-image" src={Revieve} alt="Total Orders" />
            <p className="statistique-number">{statistics.prêt}</p>
          </div>
          <p className="statistique-title">Total des commandes reçues</p>
          <div className='statistique-link'>
            <a href="/Dashboard/Demandes">View Detail</a>
          </div>
        </div>

        <div className="statistique-item second-item">
          <div className="statistique-content">
            <img className="statistique-image" src={Confirmed} alt="Confirmed Orders" />
            <p className="statistique-number">{statistics.enCours}</p>
          </div>
          <p className="statistique-title">Total des commandes confirmées</p>
          <div className='statistique-link'>
            <a href="/Dashboard/Demandes-confirmées">View Detail</a>
          </div>
        </div>

        <div className="statistique-item third-item">
          <div className="statistique-content">
            <img className="statistique-image" src={Completed} alt="Completed Orders" />
            <p className="statistique-number">{statistics.finDeImpression}</p>
          </div>
          <p className="statistique-title">Total des commandes traitées</p>
          <div className='statistique-link'>
            <a href="/Dashboard/Demandes-terminer">View Detail</a>
          </div>
        </div>

        <div className="statistique-item four-item">
          <div className="statistique-content">
            <img className="statistique-image" src={Messages} alt="Messages" />
            <p className="statistique-number">{statistics.messageCount}</p>
          </div>
          <p className="statistique-title">Nombre total de messages reçus</p>
          <div className='statistique-link'>
            <a href="/Dashboard/Msg">View Detail</a>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-item">
          <Bar data={chartData} />
        </div>
        <div className="chart-item price-chart">
          <Doughnut data={doughnutData} />
        </div>
        <div className="chart-item-average">
          <Bar data={lineChartData} />
        </div>
      </div>
      
    </>
  );
};

export default Statistique;
