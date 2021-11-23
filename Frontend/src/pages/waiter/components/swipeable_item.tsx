import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";

import {
  LeadingActions,
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
  trailingChild: React.ReactNode;
  leadingChild?: React.ReactNode;
  trailingIcon: React.ReactNode;
  leadingIcon?: React.ReactNode;
  list: Order[];
  onClick: (orderAction: Order) => void;
  onUndo?: (orderAction: Order) => void;
}

export default function SwipeableItem(props: Props) {
  const trailingActions = (
    orderAction: Order,
    onClick: (orderAction: Order) => void
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
            {props.trailingIcon}
            {props.trailingChild}
          </Center>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = (
    orderAction: Order,
    onClick: (orderAction: Order) => void
  ) => (
    <LeadingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          onClick(orderAction);
        }}
      >
        <Box bg="red.200">
          <Center justifyContent="justify-center" display="row" d="flex" px="1">
            {props.leadingIcon}
            {props.leadingChild}
          </Center>
        </Box>
      </SwipeAction>
    </LeadingActions>
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
            trailingActions={trailingActions(order, props.onClick)}
            leadingActions={
              props.onUndo != null ? leadingActions(order, props.onUndo!) : null //TODO FIX
            }
          >
            {props.children(order.name, order.table)}
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </Flex>
  );
}
