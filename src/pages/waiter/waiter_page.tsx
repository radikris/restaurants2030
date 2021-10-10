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
import { IndexKind } from "typescript";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import SwipeableItem from "./components/swipeable_item";
import { OrderModel } from "../../models/order";

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

var ORDERS: OrderModel[] = [
  { title: "order1", price: 12, id: "1", table: 1 },
  { title: "order2", price: 120, id: "2", table: 1 },
  { title: "order3", price: 240, id: "3", table: 2 },
  { title: "order4", price: 321, id: "4" },
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
          {TABLES.map((item, index) => (
            <TableCard idx={index} />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        <SwipeableItem
          children={<DoneOrderCard />}
          swipeChild={<Text>OUT</Text>}
          icon={<FaArrowAltCircleLeft />}
          id="1"
          list={ORDERS}
          onClick={function (id: string): void {
            console.log("deleted ${}");
          }}
        />
      </GridItem>
    </Grid>
  );
}
