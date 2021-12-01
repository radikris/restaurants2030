import { Flex } from "@chakra-ui/layout";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import CommonCard from "../../../common/components/common_card";
import CommonSelectDate from "../../../common/components/common_select_date";

export interface Props {
  children: React.ReactNode;
  showDateSelect: boolean;
  title: string;
}

export default function ChartCard(props: Props) {
  return (
    <Box>
      <Text
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textAlign="center"
      >
        {props.title}
      </Text>
      <CommonCard>
        <Flex direction={"column"} flexGrow={1}>
          {props.showDateSelect && (
            <Flex justifyContent={"right"}>
              {" "}
              <CommonSelectDate />
            </Flex>
          )}
          {props.children}
        </Flex>
      </CommonCard>
    </Box>
  );
}
