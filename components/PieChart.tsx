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
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
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
    <div className="relative">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
