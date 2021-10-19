import { Badge, Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export interface Props {
  orderName: string;
  tableNum: number;
  showTable: boolean;
  fontSize: string;
}

export default function DoneOrderCard(props: Props) {
  return (
    <Box flexGrow={1} mx={2}>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize={props.fontSize} fontWeight="bold">
          {props.orderName}
        </Text>
        {props.showTable && (
          <Badge my="1" fontSize="0.8em" colorScheme="green" variant="solid">
            {props.tableNum}
          </Badge>
        )}
      </Box>
      <Divider />
    </Box>
  );
}
