import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Ensure you are importing from 'chart.js/auto'

const ChartComponent = ({ partyVotesData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && partyVotesData) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy(); // Destroy existing chart instance
            }

            const ctx = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(partyVotesData),
                    datasets: [{
                        label: 'Votes Count',
                        data: Object.values(partyVotesData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy(); // Cleanup on component unmount
            }
        };
    }, [partyVotesData]);

    return (
        <div className="chart-container">
            <canvas id="voteChart" ref={chartRef} width="400" height="300"></canvas>
        </div>
    );
};

export default ChartComponent;