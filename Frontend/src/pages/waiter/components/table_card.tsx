import {
  Badge,
  Box,
  Grid,
  VStack,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";

import "react-swipeable-list/dist/styles.css";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import SwipeableItem from "./swipeable_item";

import React from "react";
import AddOrderCard from "./add_order_card";
import DoneOrderCard from "./done_order_card";
import TablePayModal from "./table_pay_modal";
import { OrderStatus } from "../../../models/order_status";
import { Order } from "../../../models/order";
import { FoodDrink } from "../../../models/food_drink";

interface Props {
  table: Order[];
  foodDrinks: FoodDrink[];
  tableNumber: number;
  addOrder: (order: Order) => void;
  changeStatus: (order: Order, status: OrderStatus) => void;
}

export default function TableCard(props: Props) {
  const [isPayOpen, setIsPayOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsPayOpen((prevPayOpen) => !prevPayOpen);
  };

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
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Box />
            <Badge fontSize="md" mb={1} mr={3}>
              Table {props.tableNumber}
            </Badge>
            <AddOrderCard
              addNewOrders={props.addOrder}
              foodDrinks={props.foodDrinks}
              tableNum={props.tableNumber}
            />
          </Grid>

          <Box
            w="100%"
            bg="orange.200"
            d="flex"
            display="table-column"
            justifyContent="justify-start"
          >
            <SwipeableItem
              children={(orderName, tableNum) => (
                <DoneOrderCard
                  fontSize={"md"}
                  orderName={orderName}
                  tableNum={tableNum}
                  showTable={false}
                />
              )}
              swipeChild={<Text>DONE</Text>}
              icon={<FaArrowAltCircleDown />}
              list={[
                ...props.table.filter(
                  (x) =>
                    x.orderStatus === OrderStatus.InProgress ||
                    x.orderStatus === OrderStatus.Ready
                ),
              ]}
              onClick={function (orderAction: Order): void {
                props.changeStatus(orderAction, OrderStatus.Served);
              }}
            />
          </Box>
          <Divider variant="dashed" />
          <Box w="100%" bg="green.200">
            <SwipeableItem
              children={(orderName, tableNum) => (
                <DoneOrderCard
                  orderName={orderName}
                  tableNum={tableNum}
                  showTable={false}
                  fontSize={"md"}
                />
              )}
              swipeChild={<Text>BACK</Text>}
              icon={<FaArrowAltCircleUp />}
              list={[
                ...props.table.filter(
                  (x) => x.orderStatus === OrderStatus.Served
                ),
              ]}
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
          onClick={toggleOpen}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          PAY
        </Button>
        <TablePayModal
          isOpen={isPayOpen}
          table={props.table}
          toggleOpen={toggleOpen}
          tableNum={props.tableNumber}
        />
      </Box>
    </Box>
  );
}
