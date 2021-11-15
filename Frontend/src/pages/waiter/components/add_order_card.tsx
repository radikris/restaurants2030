import React, { ChangeEvent, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Box,
  Button,
  Text,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Divider,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Wrap,
  Badge,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";

import AddedOrderItem from "./added_order_item";
import { Order } from "../../../models/order";
import { FoodDrink } from "../../../models/food_drink";
import WaiterContext from "../../../store/waiter_context";

export interface AddOrderProps {
  tableNum: number;
  foodDrinks: FoodDrink[];
  addNewOrders: (order: Order) => void;
}

var availableMenus: FoodDrink[] = [];

const AddOrderCard = (props: AddOrderProps) => {
  const waiterContext = React.useContext(WaiterContext);

  const [selectedItems, setSelectedItems] = React.useState<FoodDrink[]>([]);

  const [sortedMenus, setSortedMenus] = React.useState<FoodDrink[]>([]);

  useEffect(() => {
    availableMenus = props.foodDrinks;
    setSortedMenus(props.foodDrinks);
  }, [props.foodDrinks]);

  const changeOrderQuantity = (id: number, change: number) => {
    let findAddedItem = sortedMenus.findIndex((menu) => menu.id === id);

    var currentStateOfItem = { ...sortedMenus[findAddedItem] };
    currentStateOfItem.quantity = currentStateOfItem.quantity + change;
    let modifiedList = sortedMenus;
    modifiedList[findAddedItem] = currentStateOfItem;

    setSortedMenus(modifiedList);
  };

  const handleOrderRemove = (id: number) => {
    let findRemovedItem = selectedItems.findIndex((menu) => menu.id === id);
    setSelectedItems(selectedItems.filter((_, idx) => idx !== findRemovedItem));

    changeOrderQuantity(id, -1);
  };

  const handleOrderSelected = (item: FoodDrink) => {
    setSelectedItems([...selectedItems, item]);

    changeOrderQuantity(item.id, +1);
  };

  const handleOrderSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    setSortedMenus(
      sortedMenus.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );

    if (sortedMenus.length === 0 || text.trim().length === 0) {
      setSortedMenus(availableMenus);
    }
  };

  const clearOrders = () => {
    setSelectedItems([]);
    sortedMenus.map((menu) => (menu.quantity = +0));
    setSortedMenus(sortedMenus);
  };

  const handleOrderAdd = () => {
    //ITT KELLENE SZÓLNI SINGNALR AddNewOrders, és selectedItems helyett azon végigmenni

    //connectiont meg a restaurantid-t megkapni contextből, és a tablenumot átadni még a paraméternek
    //      elején useeffecetben feliratkoztatni:
    //      connection.on("AddNewOrdersHandler", (orders: Order[]) => {
    //          handleAddNewOrders(orders);
    //      });
    //         connection.invoke("AddNewOrders", { RestaurantId: 1, TableNum: props.tableNum, NewOrders: selectedItems});

    //console.log(selectedItems);
    console.log(sortedMenus);
    waiterContext?.connection?.invoke("AddNewOrders", {
      RestaurantId: 1,
      TableNum: props.tableNum,
      NewOrders: sortedMenus,
    });
    clearOrders();
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
          <PopoverBody>
            <Wrap>
              {selectedItems.map((item) => (
                <AddedOrderItem
                  title={item.name}
                  id={item.id}
                  onClose={handleOrderRemove}
                />
              ))}
            </Wrap>
            <Divider my={1} />
            <Box>
              <VStack>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Search for orders..."
                    onChange={handleOrderSearch}
                  />
                </InputGroup>
                <Button
                  my={2}
                  colorScheme={"red"}
                  size={"xs"}
                  onClick={clearOrders}
                  variant={"outline"}
                >
                  REMOVE ALL ORDERS
                </Button>
                {sortedMenus.map((item) => (
                  <Box
                    w={"full"}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text>{item.name}</Text>
                    <Box zIndex={1}>
                      <IconButton
                        position="relative"
                        size={"sm"}
                        onClick={() => handleOrderSelected(item)}
                        aria-label="Add menu"
                        icon={
                          <>
                            <AddIcon />
                            {item.quantity != null && item.quantity > 0 && (
                              <Badge
                                position={"absolute"}
                                top={"-5px"}
                                right={"-5px"}
                                colorScheme="red"
                              >
                                {item.quantity}
                              </Badge>
                            )}
                          </>
                        }
                      />
                    </Box>
                  </Box>
                ))}
              </VStack>
            </Box>
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
