/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { DataAppointmentsChartProps } from '../../../../../../types/props/chart.props';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PatientsByTreatmentChart: React.FC<DataAppointmentsChartProps> = ({ dataAppointmentsForChart }) => {
  const treatmentGroups = dataAppointmentsForChart.reduce((acc, appointment) => {
    const treatment = appointment.reason;
    acc[treatment] = acc[treatment] ? acc[treatment] + 1 : 1;
    return acc;
  }, {} as { [key: string]: number });

  const labels = Object.keys(treatmentGroups);
  const values = Object.values(treatmentGroups);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pacientes por Tratamiento',
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
    <div style={{ width: '100%', height: '500px', margin: '0 auto' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
