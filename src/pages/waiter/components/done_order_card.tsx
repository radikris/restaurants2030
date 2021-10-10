import { Badge, Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export default function DoneOrderCard() {
  return (
    <Box>
      <Flex px="2" my="2">
        <Text fontSize="xl" fontWeight="bold">
          Segun Adebayo
        </Text>
        <Spacer />
        <Badge ml="1" fontSize="0.8em" colorScheme="green" variant="solid">
          New
        </Badge>
      </Flex>
      <Divider />
    </Box>
  );
}
