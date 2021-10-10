import React, { useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  VStack,
  Text,
  Box,
  Flex,
  Center,
  Spacer,
  HStack,
  Wrap,
  WrapItem,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import TableCard from "./components/table_card";
import DoneOrderCard from "./components/done_order_card";

const ALL_ORDER = [
  {
    name: "alma",
  },
  {
    name: "korte",
  },
  {
    name: "szilva",
  },
  {
    name: "eper",
  },
];

const TABLES = [
  "Table 1",
  "Table 2",
  "Table 3",
  "Table 4",
  "Table 5",
  "Table 6",
  "Table 7",
  "Table 8",
  "Table 9",
  "Table 10",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
  "Table 11",
];

interface Props {
  name: string;
}

export default function WaiterPage() {
  const [finishedOrder, setfinishedOrder] = useState<Props[]>([]);

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem colSpan={4} bg="papayawhip" p={2}>
        <Wrap>
          {TABLES.map((item) => (
            <TableCard />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        <DoneOrderCard />
        <DoneOrderCard />
        <DoneOrderCard />
        <DoneOrderCard />
        <DoneOrderCard />
        <DoneOrderCard />
        <DoneOrderCard />
      </GridItem>
    </Grid>
  );
}
