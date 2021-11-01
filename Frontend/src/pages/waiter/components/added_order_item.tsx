import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";

export interface Props {
  onClose: (id: number) => void;
  title: string;
  id: number;
}

export default function AddedOrderItem(props: Props) {
  return (
    <HStack spacing={4}>
      <Tag
        size={"md"}
        key={props.id}
        borderRadius="full"
        variant="solid"
        colorScheme="orange"
      >
        <TagLabel>{props.title}</TagLabel>
        <TagCloseButton onClick={() => props.onClose(props.id)} />
      </Tag>
    </HStack>
  );
}
