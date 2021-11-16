import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { BiRestaurant } from "react-icons/bi";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Formik, Form, Field, FieldProps } from "formik";
import { register } from '../../util/agent';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={{restaurantName: '', email: '', password: ''}}
        onSubmit={(values, action) => {
          register(values);
          console.log(values);
          action.setSubmitting(false);
        }}
      >
        {({isSubmitting}) => (
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <Field name="restaurantName">
              {({ field }: FieldProps) => (
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<BiRestaurant color="gray.300" />}
                  />
                  <Input {...field} type="text" placeholder="Restaurant name"/>
                </InputGroup>
              </FormControl>
              )}
              </Field>
              <Field name="email">
              {({ field }: FieldProps) => (
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input {...field} type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              )}
              </Field>
              <Field name="password">
              {({ field }: FieldProps) => (
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              )}
              </Field>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isSubmitting}
              >
                Registration
              </Button>
            </Stack>
          </Form>
        </Box>
      </Stack>
      )}
      </Formik>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" href="/login">
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
