import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Text,
  Center,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Spacer,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { set } from "immer/dist/utils/common";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { OrderModel } from "../../../models/order";

interface Props {
  children: React.ReactNode;
  setPendingTable: (tableIdx: number, newList: OrderModel[]) => void;
}

export interface Item {
  label: string;
  value: string;
}
const countries = [
  { value: "Order1", label: "Order1" },
  { value: "Order2", label: "Order2" },
  { value: "Order3", label: "Order3" },
  { value: "Order4", label: "Order4" },
  { value: "Order5", label: "Order5" },
  { value: "Order6", label: "Order6" },
  { value: "Order7", label: "Order7" },
  { value: "Order8", label: "Order8" },
  { value: "Order9", label: "Order9" },
  { value: "Order10", label: "Order10" },
];

export interface AddOrderProps {
  tableNum: number;
  addNewOrders: (order: OrderModel) => void;
}

const AddOrderCard = (props: AddOrderProps) => {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const alma = { value: "asd", label: "asd" };

  const [almaList, setAlmaList] = React.useState<Item[]>([]);

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const findLastAddedElement = (selectedItems: Item[], lastItems: Item[]) => {
    if (selectedItems.length < lastItems.length) {
      let difference = lastItems.filter((x) => !selectedItems.includes(x));
      return difference[0];
    }

    return selectedItems[selectedItems.length - 1];
  };

  const handleSelectedItemsChange = (selectedItems?: Item) => {
    if (selectedItems) {
      console.log(selectedItems!);
      setAlmaList([...almaList, selectedItems!]);
    }
  };

  const handleOrderAdd = () => {
    selectedItems.forEach((item) => {
      props.addNewOrders({
        id: item.value,
        table: props.tableNum,
        title: item.label,
        price: 12,
      });
    });

    setSelectedItems([]);
  };

  const customRender = (selected: Item) => {
    return (
      <Flex spacing={5} justifyContent="space-between">
        <Text>{selected.label}</Text>
        <Spacer />
        <Box></Box>
      </Flex>
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="orange" size="xs">
          <FaPlus />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <CUIAutoComplete
              label="Search your order or click dropdown"
              placeholder="Order name"
              onCreateItem={handleCreateItem}
              selectedItems={almaList}
              itemRenderer={customRender}
              items={pickerItems}
              onSelectedItemsChange={(changes) => {
                handleSelectedItemsChange(
                  findLastAddedElement(changes.selectedItems!, almaList)
                );
              }}
            />
          </PopoverBody>
          <PopoverFooter>
            <Center>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={handleOrderAdd}
              >
                ADD ORDERS
              </Button>
            </Center>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default AddOrderCard;
