import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getPopularFoodDrinks } from "../../../util/agent";

export interface DataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

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
  const [popularFoodDrink, setpopularFoodDrink] = useState<DataProps>();
  useEffect(() => {
    const fetchAnalytics = async () => {
      const result = await getPopularFoodDrinks();
      var dataName: string[];
      var dataValue: number[];
      dataName = [];
      dataValue = [];
      result.forEach((element) => {
        console.log(element);
        dataName.push(element.dataName);
        dataValue.push(element.dataValue);
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
      setpopularFoodDrink(data);
    };
    fetchAnalytics();
  }, []);

  return (
    <>
      <Doughnut data={popularFoodDrink} />
    </>
  );
}
