import { Button, Text } from "@chakra-ui/react";
import { Box, Center, Grid, GridItem, VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import SelectPaymentOption from "./select_payment_option";
import TableBillList from "./table_bill_list";
import { Order } from "../../../models/order";
import ApiContext from "../../../store/api_context";
import { HubConnectionState } from "@microsoft/signalr";

export interface IProps {
  table: Order[];
}

export default function TablePayBill(props: IProps) {
  const [isSplitBill, setIsSplitBill] = useState(false);
  console.log(isSplitBill);

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
  };
  const moveOrderToNormalBill = (id: number) => {
    const orderIdx = splitBill.findIndex((o) => o.id === id);
    const order = splitBill[orderIdx];
    setSplitBill(splitBill.filter((_, i) => i !== orderIdx));
    setNormalBill([...normalBill, order]);
  };

  const apiContext = React.useContext(ApiContext);

  // useEffect(() => {
  //   if (apiContext?.connection) {
  //     apiContext?.connection.on("PayOrdersHandler", (orders: Order[]) => {
  //       console.log("useeffect handler");
  //       console.log(isSplitBill);
  //       handlePayOrder(orders);
  //     });
  //   }
  // }, [apiContext?.connection]);

  const payOrderInvoke = () => {
    console.log("payorderinvoke");
    console.log(isSplitBill);

    if (apiContext?.connection?.state === HubConnectionState.Connected) {
      apiContext?.connection.invoke("PayOrder", {
        PaidOrders: isSplitBill ? splitBill : normalBill,
        CheckoutMethod: 1, //TODO GET IT FROM RADIOBUTTON
      });
      //apiContext?.connection?.invoke("GetAllOrders");
      handlePayOrder();
    }
  };

  const handlePayOrder = () => {
    console.log("handlepay called");
    console.log(isSplitBill);
    if (isSplitBill) {
      console.log("splitbillt torlom");
      setSplitBill([]);
    } else {
      console.log("normalbillt torlom");
      setNormalBill([]);
    }
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
            <Button onClick={payOrderInvoke}>PAY</Button>
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
              {!isSplitBill && (
                <Text mx={1}>Do you want to split the bill?</Text>
              )}
              {isSplitBill && <Text mx={1}>Back to only normal bill</Text>}
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
                  <Button onClick={payOrderInvoke}>PAY</Button>
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
