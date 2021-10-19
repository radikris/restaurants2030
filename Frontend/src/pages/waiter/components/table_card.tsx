import { Box, Button, Divider, Text, VStack } from "@chakra-ui/react";
import "react-swipeable-list/dist/styles.css";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import SwipeableItem from "./swipeable_item";

import React from "react";
import { Order, OrderStatus } from "../waiter_page";

interface Props {
  table: Order[];
  changeStatus: (order: Order, status: OrderStatus) => void;
}

export default function TableCard(props: Props) {
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
            {
              <SwipeableItem
              children={<Text>item</Text>}
              swipeChild={<Text>DONE</Text>}
              icon={<FaArrowAltCircleDown />}
              list={[...props.table.filter(x => x.orderStatus === OrderStatus.InProgress || x.orderStatus === OrderStatus.Ready)]}
              onClick={function (orderAction: Order): void {
                props.changeStatus(orderAction, OrderStatus.Served);
              }}
            />}
          </Box>
          <Divider variant="dashed" />
          <Box w="100%" bg="green.200">
            <SwipeableItem
              children={<Text>item</Text>}
              swipeChild={<Text>BACK</Text>}
              icon={<FaArrowAltCircleUp />}
              list={[...props.table.filter(x => x.orderStatus === OrderStatus.Served)]}
              onClick={function (orderAction: Order): void {
                props.changeStatus(orderAction, OrderStatus.Ready);
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