import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import BASE_URL from "../../../conf/conf";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeesCollection = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeesCollection = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/feesCollection/getFeesCollectionList`);
        const data = response.data.data;

        // Process data for the chart
        const processedData = processChartData(data);
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching fees collection data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeesCollection();
  }, []);

  const processChartData = (data) => {
    const monthlyTotals = {};

    data.forEach((item) => {
      const month = new Date(item.collectionDate).toLocaleString("default", {
        month: "short",
      });
      const year = new Date(item.collectionDate).getFullYear();
      const key = `${month} ${year}`;

      if (!monthlyTotals[key]) {
        monthlyTotals[key] = { total: 0, collected: 0 };
      }

      monthlyTotals[key].total += item.feeAmount;
      if (item.isActive) {
        monthlyTotals[key].collected += item.feeAmount;
      }
    });

    // Sort months by date
    const sortedMonths = Object.keys(monthlyTotals).sort((a, b) => {
      return new Date(`01 ${a}`) - new Date(`01 ${b}`);
    });

    // Split labels into months only (to group by year later)
    const labels = Array.from(new Set(sortedMonths.map((key) => key.split(" ")[0])));

    // Process data for the 12 months (slim bars grouped for each month)
    return {
      labels,
      datasets: [
        {
          label: "Collected Fee",
          data: labels.map((month) =>
            Object.keys(monthlyTotals)
              .filter((key) => key.startsWith(month))
              .reduce((sum, key) => sum + monthlyTotals[key].collected, 0)
          ),
          backgroundColor: "#4caf50", // Green
          barPercentage: 0.4,
        },
        {
          label: "Total Fee",
          data: labels.map((month) =>
            Object.keys(monthlyTotals)
              .filter((key) => key.startsWith(month))
              .reduce((sum, key) => sum + monthlyTotals[key].total, 0)
          ),
          backgroundColor: "#2196f3", // Blue
          barPercentage: 0.4,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-blue-500 font-semibold">Loading Fees Collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Fees Collection</h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Yearly Fees Distribution (Collected vs Total)",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw.toLocaleString("en-US");
                    return `${context.dataset.label}: ₹ ${value}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
              },
              y: {
                grid: { color: "#e5e7eb" },
                ticks: {
                  callback: (value) => `₹ ${value}`,
                },
              },
            },
          }}
        />
      ) : (
        <p className="text-gray-500 text-center">No data available for the chart.</p>
      )}
    </div>
  );
};

export default FeesCollection;
