import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Investment {
  type: string;
  percentage: number;
}

interface PieChartProps {
  investments: Investment[] | undefined;
}

const PieChart: React.FC<PieChartProps> = ({ investments }) => {
  const labels = investments?.map((investment) => investment.type) || [];
  const data = investments?.map((investment) => investment.percentage) || [];

  const chartData: ChartData<"pie"> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["#9BCB90", "#95D2B3", "#55AD9B", "#F1F8E8"],
        hoverBackgroundColor: ["#A4B8A0", "#5B947A", "#32716A", "#C2D0B7"],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value) => {
          return `${value}%`;
        },
        font: {
          weight: "bold",
          size: 16,
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function () {
            return "";
          },
        },
      },
      legend: {
        labels: {
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="relative h-[465px] w-full rounded-lg bg-white shadow-xl">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
