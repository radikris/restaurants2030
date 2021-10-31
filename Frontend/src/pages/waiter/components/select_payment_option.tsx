import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import {
  HStack,
  Text,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { PaymentOption } from "../../../models/payment_option";

export interface Props {
  paymentOption: PaymentOption;
  isSelected: boolean;
}

// export default function SelectPaymentOption(props: Props) {
//   return (
//     <Box
//       background={"grey.200"}
//       h="150px"
//       boxShadow={"xl"}
//       rounded={"lg"}
//       p={6}
//       m={3}
//       _hover={{
//         transform: "scale(1.1)",
//         boxShadow: "xxl",
//         background: "white",
//       }}
//       border="12px"
//       borderColor="white"
//     ></Box>
//   );
// }

interface RadioCardProps extends UseRadioProps {
  label: string;
  children: React.ReactNode;
}
// 1. Create a component that consumes the `useRadio` hook
const RadioCard: FC<RadioCardProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} onClick={() => console.log(props.label)} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
//        {$enum(PaymentOption).map((paymentOpt) => {

export default function SelectPaymentOption() {
  const options = ["Cash", "BankCard"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard label={value} key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
