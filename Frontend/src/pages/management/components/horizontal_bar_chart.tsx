import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Analytics } from "../../../models/analytics";
import { getWeeklyIncome } from "../../../util/agent";

var data = {
  labels: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 1],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 130, 24, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 130, 24, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

export default function CustomHorizontalBarChart() {
  const [weeklyIncome, setweeklyIncome] = useState<Analytics[]>([]);
  useEffect(() => {
    const fetchAnalytics = async () => {
      const result = await getWeeklyIncome();
      setweeklyIncome(result);
      var dataName: string[];
      var dataValue: number[];
      dataName = [];
      dataValue = [];
      result.forEach((element) => {
        dataName.push(element.data);
        dataValue.push(element.value);
      });

      var setDataSet: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
      }[];
      setDataSet = [];
      setDataSet.push({ ...data.datasets[0], data: dataValue });

      data = {
        ...data,
        labels: dataName,
        datasets: setDataSet,
      };
    };
    fetchAnalytics();
  }, []);

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
