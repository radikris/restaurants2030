import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Editable,
  EditableInput,
  EditablePreview,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { deleteFoodDrink, updateFoodDrink } from "../../../util/agent";
import { FoodDrink } from "../../../models/food_drink";
import { MdEdit, MdDelete } from "react-icons/md";

interface IProps {
  foodDrink: FoodDrink;
  onUpdate: (id: number, name: string, price: number) => void;
  onDelete: (id: number) => void;
}

export default function EditCard(props: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editName, setEditName] = React.useState(props.foodDrink.name);
  const [editPrice, setEditPrice] = React.useState(props.foodDrink.price);

  return (
    <Box
      flexDirection="row"
      my="5"
      padding="0.5em"
      backgroundColor="papayawhip"
      rounded="0.5em"
    >
      <Box>
        <Text fontSize="lg" mb="5" fontWeight="bold">
          {props.foodDrink.name}
        </Text>
        <Text fontSize="lg" mb="5" fon>
          {props.foodDrink.price}
        </Text>
      </Box>
      <Button mx={1} onClick={onOpen} color="#41bb93">
        <MdEdit />
      </Button>
      <Button
        mx={1}
        onClick={() => {
          deleteFoodDrink(props.foodDrink.id);
          props.onDelete(props.foodDrink.id);
        }}
        color="#666666"
      >
        <MdDelete />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* onSubmit can be used to post the updated data to the server. */}
            <Editable
              onChange={setEditName}
              defaultValue={props.foodDrink.name}
              startWithEditView={true}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>

            <NumberInput
              onChange={(valueString) => setEditPrice(+valueString)}
              defaultValue={props.foodDrink.price}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button mx={3} onClick={onClose} variant="outline">
              Close
            </Button>
            <Button
              onClick={() => {
                updateFoodDrink(props.foodDrink.id, {
                  name: editName,
                  price: editPrice,
                });
                props.onUpdate(props.foodDrink.id, editName, editPrice);
              }}
              variant="solid"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
