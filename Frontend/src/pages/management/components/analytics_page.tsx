import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useCallback } from "react";

import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

import { FoodDrink } from "../../../models/food_drink";
import ApiContext from "../../../store/api_context";
import { HubConnectionState } from "@microsoft/signalr";
import { getFoodDrink } from "../../../util/agent";
import EditCard from "./editable_card";

interface IFormFoodDrink {
  name: string;
  price: number;
}

export default function AnalyticsPage() {
  const apiContext = React.useContext(ApiContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (apiContext?.connection) {
      if (apiContext?.connection.state !== HubConnectionState.Connected) {
        apiContext?.connection.start();
      }
    }
  }, [apiContext?.connection]);

  function onSubmit(data: IFormFoodDrink) {
    return new Promise((resolve) => {
      const fd = {
        name: data["name"],
        price: +value,
      };

      console.log(fd);
      resolve(
        apiContext?.connection?.invoke("AddNewFoodDrink", {
          NewFoodDrink: fd,
        })
      );
    });
  }

  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const [value, setValue] = React.useState("0.0");
  const [foodDrinks, setFoodDrinks] = React.useState<FoodDrink[]>([]);

  const handleNewFoodDrink = useCallback(
    (newFoodDrink: FoodDrink) => {
      console.log(newFoodDrink);
      foodDrinks.push(newFoodDrink);
      setFoodDrinks(foodDrinks); //TODO FIX DOUBLE ADD ISSUE
    },
    [foodDrinks]
  );

  useEffect(() => {
    if (apiContext?.connection) {
      apiContext?.connection.on(
        "AddNewFoodDrinkHandler",
        (foodDrink: FoodDrink) => {
          handleNewFoodDrink(foodDrink);
        }
      );
    }
  }, [apiContext, handleNewFoodDrink]);

  const updateItem = (id: number, name: string, price: number) => {
    const newList = foodDrinks.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          name: name,
          price: price,
        };

        return updatedItem;
      }

      return item;
    });

    setFoodDrinks(newList);
  };

  const deleteItem = (id: number) => {
    const newList = foodDrinks.filter((item) => item.id !== id);
    setFoodDrinks(newList);
  };

  useEffect(() => {
    const fetchFoodDrink = async () => {
      const result = await getFoodDrink();
      setFoodDrinks(result);
    };
    fetchFoodDrink();
  }, []);

  return (
    <Box w={"full"}>
      <Center>
        <Box
          maxW={"400px"}
          w={"full"}
          mb={4}
          p={3}
          shadow="base"
          borderWidth="1px"
          alignSelf={{ base: "center", lg: "flex-start" }}
          borderColor="gray.200"
          borderRadius={"xl"}
          boxShadow={"2xl"}
          rounded={"md"}
          background={"white"}
          overflow={"hidden"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">
                Please add your new food/drink
              </FormLabel>
              <Input
                id="name"
                placeholder="Food or drink name"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <NumberInput
                id="price"
                {...register("price", {
                  required: "This is required",
                })}
                onChange={(valueString) => setValue(parse(valueString))}
                value={format(value)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Center>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {foodDrinks.map((fooddrink) => {
          return (
            <EditCard
              foodDrink={fooddrink}
              onUpdate={updateItem}
              onDelete={deleteItem}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
