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
import { TableOrderModel } from "../../models/tableorder";

var allTablesOrders: TableOrderModel[] = [
  {
    table: 1,
    pending: [{ title: "Alma", price: 12, id: "1", table: 1 }],
    finished: [{ title: "Körte", price: 23, id: "1", table: 1 }],
  },
  {
    table: 2,
    pending: [
      { title: "Banán", price: 34, id: "1", table: 2 },
      { title: "Eper", price: 45, id: "2", table: 2 },
    ],
    finished: [{ title: "Szilva", price: 56, id: "1", table: 2 }],
  },
  {
    table: 3,
    pending: [{ title: "Majom", price: 67, id: "1", table: 3 }],
    finished: [{ title: "Kenyérfa", price: 89, id: "1", table: 3 }],
  },
];

interface Props {
  name: string;
}

export default function WaiterPage() {
  const [tableOrders, setTableOrders] =
    useState<TableOrderModel[]>(allTablesOrders);

  function setNewFinished(idx: number, list: OrderModel[]) {
    let items = [...tableOrders];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[idx - 1] };
    // 3. Replace the property you're intested in
    item.finished = list;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[idx - 1] = item;
    // 5. Set the state to our new copy
    setTableOrders(items);
  }
  function setNewPending(idx: number, list: OrderModel[]) {
    let items = [...tableOrders];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[idx - 1] };
    // 3. Replace the property you're intested in
    item.pending = list;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[idx - 1] = item;
    // 5. Set the state to our new copy
    setTableOrders(items);
  }

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem colSpan={4} bg="papayawhip" p={2}>
        <Wrap>
          {tableOrders.map((item, index) => (
            <TableCard
              table={item}
              setFinishedTable={setNewFinished}
              setPendingTable={setNewPending}
            />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        {/* <SwipeableItem
          children={<DoneOrderCard />}
          swipeChild={<Text>OUT</Text>}
          icon={<FaArrowAltCircleLeft />}
          id="1"
          list={ORDERS}
          onClick={function (id: string): void {
            console.log("deleted ${}");
          }}
        /> */}
      </GridItem>
    </Grid>
  );
}
