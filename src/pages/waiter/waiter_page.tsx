import React, { useState, useReducer } from "react";

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

var orders: OrderModel[] = [
  { title: "BanánASD", price: 34, id: "1", table: 1 },
  { title: "EperASD", price: 45, id: "2", table: 2 },
  { title: "KörteASD", price: 45, id: "2", table: 2 },
  { title: "AlmaASD", price: 45, id: "2", table: 3 },
];

export type Action = {
  type: number;
  payload: OrderModel;
};

function reducerFunc(state: TableOrderModel[], action: Action) {
  const { type, payload } = action;

  switch (type) {
    case 0:
      return {
        ...state,
        pending: [...state[0].pending, payload],
      };
    case 1:
      return {
        ...state,
        finished: [...state[0].finished, payload],
      };
    default:
      return state;
  }
}

interface Props {
  name: string;
}

export default function WaiterPage() {
  const [tableOrders, setTableOrders] =
    useState<TableOrderModel[]>(allTablesOrders);

  const [tableOrdersReducer, setTableOrderReducer] = useReducer(
    reducerFunc,
    allTablesOrders
  );

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
              setReducerFunc={setTableOrderReducer}
            />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        <SwipeableItem
          children={<DoneOrderCard />}
          swipeChild={<Text>OUT</Text>}
          icon={<FaArrowAltCircleLeft />}
          id="1"
          list={orders}
          onClick={function (orderAction: OrderModel): void {
            setNewFinished(orderAction.table, [
              ...allTablesOrders[orderAction.table - 1].finished,  //check proper indexes
              orderAction,
            ]);
          }}
        />
      </GridItem>
    </Grid>
  );
}
