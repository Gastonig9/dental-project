/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DataChartProps } from '../../../../../../types/props/chart.props';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PatientsByGenderChart: React.FC<DataChartProps> = ({ dataForChart }) => {
  const genderGroups = dataForChart.reduce((acc, patient) => {
    const gender = patient.gender;
    acc[gender] = acc[gender] ? acc[gender] + 1 : 1;
    return acc;
  }, {} as { [key: string]: number });

  const labels = Object.keys(genderGroups);
  const values = Object.values(genderGroups);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pacientes por Género',
        data: values,
        backgroundColor: [
          '#42A5F5',
          '#FF6384',
        ],
        borderColor: [
          '#1E88E5',
          '#FF6384',
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
