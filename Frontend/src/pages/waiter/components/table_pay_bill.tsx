import { Button, Text, Image } from "@chakra-ui/react";
import { Box, Center, Grid, GridItem, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PaymentOption } from "../../../models/payment_option";
import { $enum } from "ts-enum-util";
import SelectPaymentOption from "./select_payment_option";
import { Order } from "../waiter_page";
import { formatter } from "../../../util/app_util";
import TableBillList from "./table_bill_list";
import Example from "./select_payment_option";

export interface IProps {
  table: Order[];
}

export default function TablePayBill(props: IProps) {
  const [isSplitBill, setIsSplitBill] = useState(false);

  const [normalBill, setNormalBill] = useState(props.table);
  const [splitBill, setSplitBill] = useState<Order[]>([]);

  const toggleSplitBill = () => {
    setIsSplitBill((prevSplitBill) => !prevSplitBill);

    setNormalBill([...normalBill, ...splitBill]);
    setSplitBill([]);
  };

  const moveOrderToSplit = (id: number) => {
    const orderIdx = normalBill.findIndex((o) => o.id === id);
    const order = normalBill[orderIdx];

    setNormalBill(normalBill.filter((_, i) => i !== orderIdx));
    setSplitBill([...splitBill, order]);

    console.log("tosplit");
  };
  const moveOrderToNormalBill = (id: number) => {
    const orderIdx = splitBill.findIndex((o) => o.id === id);
    const order = splitBill[orderIdx];
    setSplitBill(splitBill.filter((_, i) => i !== orderIdx));
    setNormalBill([...normalBill, order]);

    console.log("tonormal");
  };

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={1} bg="papayawhip" p={2}>
        <TableBillList
          orders={normalBill}
          moveOrder={moveOrderToSplit}
          isSplitBill={isSplitBill}
          buttonText={"SPLIT"}
        />
        {!isSplitBill && (
          <Center>
            <Button>PAY</Button>
          </Center>
        )}
      </GridItem>
      <GridItem colSpan={1} bg="papayawhip" p={2}>
        <Center>
          <VStack display={"flex"} w={"full"}>
            <Button
              colorScheme="orange"
              size="xl"
              onClick={toggleSplitBill}
              p={1}
            >
              <Text mx={1}>Do you want to split the bill?</Text>
              <FaPlus />
            </Button>

            {isSplitBill && (
              <Box w={"full"} color={"blue.800"}>
                <TableBillList
                  orders={splitBill}
                  moveOrder={moveOrderToNormalBill}
                  isSplitBill={isSplitBill}
                  buttonText={"UNDO"}
                />
                <Center>
                  <Button>PAY</Button>
                </Center>
              </Box>
            )}
          </VStack>
        </Center>
      </GridItem>
      <GridItem colSpan={1}>
        <SelectPaymentOption />
      </GridItem>
    </Grid>
  );
}
