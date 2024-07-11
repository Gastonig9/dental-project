/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataAppointmentsChartProps } from "../../../../../../types/props/chart.props";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const AppointmentsByMonthChart: React.FC<DataAppointmentsChartProps> = ({
  dataAppointmentsForChart,
}) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthCounts = dataAppointmentsForChart && dataAppointmentsForChart.reduce((acc, patient) => {
    console.log(acc);
    const month = new Date(patient.date).getMonth();
    acc[month] = acc[month] ? acc[month] + 1 : 1;
    return acc;
  }, {} as { [key: number]: number });

  const labels = months;
  const values = months.map((_, index) => monthCounts && monthCounts[index] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Turnos registrados por mes",
        data: values,
        backgroundColor: "#76FFA8",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mes",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de turnos",
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
