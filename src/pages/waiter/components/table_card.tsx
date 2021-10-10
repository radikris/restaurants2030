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

export default function TableCard() {
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
              list={ORDERS}
              onClick={function (id: string): void {
                console.log("deleted ${}");
              }}
            />
          </Box>
          <Divider variant="dashed" />
          <Box w="100%" bg="green.200">
            <Text>1</Text>
            <Text>1</Text>
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
}
