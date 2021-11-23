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
import { Order } from "../../../models/order";

interface Props {
  children: (orderName: string, tableNum: number) => React.ReactNode;
  swipeChild: React.ReactNode;
  icon: React.ReactNode;
  list: Order[];
  onClick: (orderAction: Order) => void;
}

export default function SwipeableItem(props: Props) {
  const trailingActions = (orderAction: Order, onClick: (orderAction: Order) => void) => (
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
        {props.list.map((order) => (
          <SwipeableListItem 
            key={order.id} 
            trailingActions={trailingActions(order, props.onClick)}>
              {props.children(order.name, order.table)}
          </SwipeableListItem>
          ))}
        </SwipeableList>
    </Flex>
  );
}
