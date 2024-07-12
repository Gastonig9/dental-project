/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DataChartProps } from '../../../../../../types/props/chart.props';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PatientsByAgeChart: React.FC<DataChartProps> = ({ dataForChart }) => {
  const ageGroups = dataForChart.reduce((acc, patient) => {
    const age = patient.age;
    const group = `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`;
    acc[group] = acc[group] ? acc[group] + 1 : 1;
    return acc;
  }, {} as { [key: string]: number });

  const labels = Object.keys(ageGroups);
  const values = Object.values(ageGroups);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pacientes por Edad',
        data: values,
        backgroundColor: [
          '#76FFA8',
          '#0077B6',
          '#FFC107',
          '#F44336',
          '#9C27B0',
          '#FF9800',
        ],
        borderColor: [
          '#388E3C',
          '#1976D2',
          '#FFA000',
          '#D32F2F',
          '#7B1FA2',
          '#F57C00',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
