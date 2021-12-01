import { Select } from "@chakra-ui/select";
import React from "react";

export interface Props {
  values: string;
}

export default function CommonSelectDate() {
  return (
    <Select
      width="150px"
      bg="yellow.50"
      borderColor="grey.800"
      color="black"
      placeholder="Date"
    >
      <option value="option1">Weekly</option>
      <option value="option2">Monthly</option>
      <option value="option3">Yearly</option>
    </Select>
  );
}
