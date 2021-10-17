import React, { useState, useEffect, useReducer, useCallback } from "react";

import "react-multi-carousel/lib/styles.css";
import { Text, Wrap, Grid, GridItem } from "@chakra-ui/react";
import TableCard from "./components/table_card";
import DoneOrderCard from "./components/done_order_card";
import { FaArrowAltCircleUp } from "react-icons/fa";
import SwipeableItem from "./components/swipeable_item";
import { OrderModel } from "../../models/order";
import { TableOrderModel } from "../../models/tableorder";
import produce from "immer";

enum ActionTypes {
  ADD_TO_FINISHED = "AddToFinished",
  ADD_TO_PENDING = "AddToPending",
  INITIAL = "Initial",
}

type Action = {
  type: ActionTypes;
  order: OrderModel;
  allOrders?: TableOrderModel[];
};

export default function WaiterPage() {
  const [tableOrders, tableOrdersDispatch] = useReducer(
    produce((draft: TableOrderModel[], action: Action) => {
      const idx = draft.findIndex((x) => x.table === action.order.table);
      var mod = draft[idx];
      switch (action.type) {
        case ActionTypes.ADD_TO_PENDING: {
          mod.pending.push(action.order);
          mod.finished.splice(
            mod.finished.findIndex((x) => x.id === action.order.id),
            1
          );
          break;
        }
        case ActionTypes.ADD_TO_FINISHED: {
          mod.finished.push(action.order);
          mod.pending.splice(
            mod.pending.findIndex((x) => x.id === action.order.id),
            1
          );
          break;
        }
        case ActionTypes.INITIAL: {
          if (action.allOrders !== undefined) {
            action.allOrders.forEach((value, index) => draft.push(value));
          }
          break;
        }
      }
    }),
    [],
    undefined
  );

  const [allPendingOrder, setAllPendingOrders] = useState<OrderModel[]>([]);

  useEffect(() => {
    var returnArray: OrderModel[] = [];
    tableOrders.forEach(
      (order, index) => (returnArray = returnArray.concat(order.pending))
    );
    setAllPendingOrders(returnArray);
  }, [tableOrders]);

  const handleAddToPending = useCallback((order: OrderModel) => {
    tableOrdersDispatch({ type: ActionTypes.ADD_TO_PENDING, order: order });
  }, []);

  const handleAddToFinished = useCallback((order: OrderModel) => {
    tableOrdersDispatch({ type: ActionTypes.ADD_TO_FINISHED, order: order });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/allTableOrders")
      .then((res) => res.json())
      .then((data: TableOrderModel[]) => {
        tableOrdersDispatch({
          type: ActionTypes.INITIAL,
          order: { title: "", price: -1, id: "-1", table: -1 },
          allOrders: data,
        });
      });
  }, []);

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
              key={index}
              table={item}
              addToFinished={handleAddToFinished}
              addToPending={handleAddToPending}
            />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        <SwipeableItem
          children={<DoneOrderCard />}
          swipeChild={<Text>DONE</Text>}
          icon={<FaArrowAltCircleUp />}
          id="1"
          list={allPendingOrder}
          onClick={function (orderAction: OrderModel): void {
            handleAddToFinished(orderAction);
          }}
        />
      </GridItem>
    </Grid>
  );
}
