import React from "react";

import { Box, Center } from "@chakra-ui/react";

export interface Props {
  children: React.ReactNode;
}

export default function CommonCard(props: Props) {
  return (
    <Box w={"full"} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
      <Center>{props.children}</Center>
    </Box>
  );
}
