import { Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Order } from "../../../models/order";
import { formatter } from "../../../util/app_util";

export interface Props {
  orders: Order[];
  moveOrder: (id: number) => void;
  buttonText: string;
  isSplitBill: boolean;
}

export default function TableBillList(props: Props) {
  return (
    <Box>
      {props.orders.map((table) => {
        return (
          <Box
            key={table.id}
            display={"flex"}
            w={"full"}
            justifyContent={"space-between"}
            alignContent={"center"}
            alignItems={"center"}
            my={1}
          >
            <Box
              display={"flex"}
              w={"full"}
              justifyContent={"space-between"}
              mr={props.isSplitBill ? 3 : 0}
            >
              <Text>{table.name}</Text>
              <Text>{formatter.format(table.price)}</Text>
            </Box>
            {props.isSplitBill && (
              <Button
                onClick={() => props.moveOrder(table.id)}
                colorScheme={"orange"}
                variant={"outline"}
                size={"sm"}
              >
                {props.buttonText}
              </Button>
            )}
          </Box>
        );
      })}
      <Box
        w={"full"}
        border={1}
        display={"flex"}
        bg={"green.300"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"bold"}>Total amount:</Text>
        <Text fontWeight={"extrabold"}>
          {formatter.format(props.orders.reduce((a, b) => +a + b.price, 0))}
        </Text>
      </Box>
    </Box>
  );
}
