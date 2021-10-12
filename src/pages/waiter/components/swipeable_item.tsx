import { Box, Center, Text } from "@chakra-ui/react";
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
import { OrderModel } from "../../../models/order";
import { Action } from "../waiter_page";

interface Props {
  children: React.ReactNode;
  swipeChild: React.ReactNode;
  icon: React.ReactNode;
  id: string;
  list: OrderModel[];
  onClick: (orderAction: OrderModel) => void;
  onReducer?: React.Dispatch<Action>;
}

const SwipeableItem: React.FC<Props> = (props) => {
  const trailingActions = (
    orderAction: OrderModel,
    onClick: (orderAction: OrderModel) => void
  ) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          onClick(orderAction);

          /*props.onReducer!({
            type: 0,
            payload: orderAction
          });*/
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

  console.log(props.list);

  return (
    <div>
      {props.list.map((order, key) => (
        <SwipeableList
          key={key}
          fullSwipe={false}
          style={{ backgroundColor: "orange.200" }}
          type={ListType.IOS}
          threshold={0.1}
        >
          <SwipeableListItem
            trailingActions={trailingActions(order, props.onClick)}
          >
            {order.title}
          </SwipeableListItem>
        </SwipeableList>
      ))}
    </div>
  );
};

export default SwipeableItem;
