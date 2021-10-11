import { Box, Button, Center, Divider, Text, VStack } from "@chakra-ui/react";
import {
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { FaArrowAltCircleDown } from "react-icons/fa";
import SwipeableItem from "./swipeable_item";
import { OrderModel } from "../../../models/order";
import { TableOrderModel } from "../../../models/tableorder";

import React, { Dispatch, SetStateAction } from "react";

interface Props {
  table: TableOrderModel;
  setFinishedTable: (tableIdx: number, newList: OrderModel[]) => void;
  setPendingTable: (tableIdx: number, newList: OrderModel[]) => void;
}

const TableCard: React.FC<Props> = (props) => {
  return (
    <Box
      maxW={"270px"}
      w={"full"}
      bg="whiteAlpha.900"
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
      m="3"
      _hover={{
        transform: "scale(1.2)",
        boxShadow: "lg",
        borderColor: "grey.900",
      }}
    >
      <Box p={6}>
        <VStack spacing="2px">
          <Box
            w="100%"
            bg="orange.200"
            d="flex"
            display="table-column"
            justifyContent="justify-start"
          >
            <SwipeableItem
              children={<Text>item</Text>}
              swipeChild={<Text>OUT</Text>}
              icon={<FaArrowAltCircleDown />}
              id="1"
              list={props.table.pending}
              onClick={function (orderAction: OrderModel): void {
                props.setFinishedTable(orderAction.table, [
                  ...props.table.finished,
                  orderAction,
                ]);
              }}
            />
          </Box>
          <Divider variant="dashed" />
          <Box w="100%" bg="green.200">
            <SwipeableItem
              children={<Text>item</Text>}
              swipeChild={<Text>OUT</Text>}
              icon={<FaArrowAltCircleDown />}
              id="1"
              list={props.table.finished}
              onClick={function (orderAction: OrderModel): void {
                props.setPendingTable(orderAction.table, [
                  ...props.table.finished,
                  orderAction,
                ]);
              }}
            />
          </Box>
        </VStack>

        <Button
          w={"full"}
          mt={4}
          bg="gray.900"
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          PAY
        </Button>
      </Box>
    </Box>
  );
};

export default TableCard;
