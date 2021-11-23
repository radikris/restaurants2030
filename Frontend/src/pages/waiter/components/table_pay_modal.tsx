import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Order } from "../../../models/order";
import TablePayBill from "./table_pay_bill";

export interface IProps {
  isOpen: boolean;
  toggleOpen: () => void;
  table: Order[];
  tableNum: number;
}

export default function TablePayModal(props: IProps) {
  return (
    <Modal onClose={props.toggleOpen} size={"full"} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment for TABLE{props.tableNum} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TablePayBill table={props.table} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.toggleOpen}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
