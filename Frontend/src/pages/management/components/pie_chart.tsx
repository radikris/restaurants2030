import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Analytics } from "../../../models/analytics";
import { getPopularFoodDrinks } from "../../../util/agent";

var data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function CustomPieChart() {
  const [weeklyIncome, setweeklyIncome] = useState<Analytics[]>([]);
  useEffect(() => {
    const fetchAnalytics = async () => {
      const result = await getPopularFoodDrinks();
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
      <Doughnut data={data} />
    </>
  );
}
