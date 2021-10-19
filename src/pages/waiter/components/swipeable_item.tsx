import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";

import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { OrderModel } from "../../../models/order";

interface Props {
  children: (orderName: string, tableNum: number) => React.ReactNode;
  swipeChild: React.ReactNode;
  icon: React.ReactNode;
  id: string;
  list: OrderModel[];
  onClick: (orderAction: OrderModel) => void;
}

export default function SwipeableItem(props: Props) {
  const trailingActions = (
    orderAction: OrderModel,
    onClick: (orderAction: OrderModel) => void
  ) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          onClick(orderAction);
        }}
      >
        <Box bg="red.200">
          <Center justifyContent="justify-center" display="row" d="flex" px="1">
            {props.icon}
            {props.swipeChild}
          </Center>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Flex>
      <SwipeableList
        fullSwipe={true}
        style={{ backgroundColor: "orange.200" }}
        type={ListType.ANDROID}
        threshold={0.5}
      >
        {props.list.map((order, key) => (
          <SwipeableListItem
            key={order.title}
            trailingActions={trailingActions(order, props.onClick)}
          >
            {props.children(order.title, order.table)}
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </Flex>
  );
}
