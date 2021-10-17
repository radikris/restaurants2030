import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
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
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
];

const AddOrderCard = () => {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
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
          <PopoverHeader></PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <CUIAutoComplete
              label="Search your order or click dropdown"
              placeholder="Order name"
              onCreateItem={handleCreateItem}
              items={pickerItems}
              selectedItems={selectedItems}
              onSelectedItemsChange={(changes) =>
                handleSelectedItemsChange(changes.selectedItems)
              }
            />
          </PopoverBody>
          <PopoverFooter>
            <Center>
              <Button colorScheme="teal" variant="outline">
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
