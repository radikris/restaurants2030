import {
  Box,
  Button,
  Text,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  Spacer,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Order, OrderStatus } from "../waiter_page";

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
  addNewOrders: (order: Order) => void;
}

const AddOrderCard = (props: AddOrderProps) => {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      console.log(selectedItems!);
      setSelectedItems(selectedItems);
    }
  };

  const handleOrderAdd = () => {
    selectedItems.forEach((item) => {
      props.addNewOrders({
        id: parseInt(item.value),
        table: props.tableNum,
        name: item.label,
        price: 12,
        orderStatus: OrderStatus.InProgress
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
              selectedItems={selectedItems}
              itemRenderer={customRender}
              items={pickerItems}
              onSelectedItemsChange={(changes: any) => {
                handleSelectedItemsChange(changes.selectedItems);
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
