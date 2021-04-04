import {
  Flex,
  Link,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  useToast,
  ColorModeScript,
  useColorMode,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons"
import { AuthenticationError, Head, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import changePassword from "app/auth/mutations/changePassword"
import { Form, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import * as z from "zod"

export default function Layout({ children }) {
  const [logoutMutation] = useMutation(logout)
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Head>
        <title>{"Farmers' Market"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeScript initialColorMode="light" />
      <Flex direction="column" alignItems="center">
        <Heading
          fontSize="2xl"
          marginBottom="1rem"
          bgClip="text"
          bgGradient="linear(to-r, green.600, green.400, yellow.400, yellow.600)"
        >
          Farmers' Market
        </Heading>
        <Flex width={["100vw", "850px"]} grow={1} direction="column" justifyContent="space-between">
          <Flex
            borderWidth="0.2rem"
            borderRadius="lg"
            direction="row"
            justifyContent="space-between"
            margin="0.5rem"
            padding="0.5rem"
          >
            <Flex>
              <Breadcrumb separator="/">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="/activeLists">Shoppinglist</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Chat</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            <Menu placement="left-start" closeOnBlur={true}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                size="xs"
                variant="outline"
              />
              <MenuList>
                <Link href="/archivedLists">
                  <MenuItem>Archived Lists</MenuItem>
                </Link>
                <MenuItem onClick={onOpen}>Change Password</MenuItem>
                <MenuItem
                  onClick={async () => {
                    window.location.href = "/"
                    await logoutMutation()
                  }}
                >
                  Logout{" "}
                </MenuItem>

                <MenuItem>
                  {" "}
                  <IconButton
                    aria-label="light-mode"
                    icon={<SunIcon />}
                    onClick={toggleColorMode}
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {children}
        </Flex>
      </Flex>

      <ChangePassword isOpen={isOpen} onClose={onClose} />
    </>
  )
}

function ChangePassword({ isOpen, onClose }) {
  const [changePasswordMutation] = useMutation(changePassword)
  const toast = useToast()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <Form
          onSubmit={async (values) => {
            try {
              await changePasswordMutation({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
              })
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                toast({
                  title: "Sorry",
                  description: "Something went wrong. Please try again.",
                  status: "error",
                  duration: 8000,
                  isClosable: true,
                })
                return {
                  [FORM_ERROR]: "Something went wrong.",
                }
              }
            }
          }}
          validate={(values) => {
            const errors = {}

            if (!z.string().min(10).max(100).check(values.newPassword))
              errors.newPassword = "You password should have more than 10 charakters."
            else if (values.newPassword !== values.newPasswordRepeat)
              errors.newPasswordRepeat = "The passwords doesn't match."
            console.log(errors)
            return errors
          }}
          render={({ submitError, handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody id="body">
                <Field name="currentPassword">
                  {({ input, meta }) => (
                    <FormControl isRequired isInvalid={submitError}>
                      <FormLabel>Old Password</FormLabel>
                      <Input {...input} type="password" placeholder="Current password" />
                      <FormErrorMessage>{submitError}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="newPassword">
                  {({ input, meta }) => (
                    <FormControl isRequired isInvalid={meta.error && meta.touched}>
                      <FormLabel>New password</FormLabel>
                      <Input {...input} type="password" placeholder="New password" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="newPasswordRepeat">
                  {({ input, meta }) => (
                    <FormControl isRequired isInvalid={meta.error && meta.touched}>
                      <FormLabel>Repeat new password</FormLabel>
                      <Input {...input} type="password" placeholder="New password" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" disabled={submitting}>
                  ChangePassword
                </Button>
                <Button
                  marginLeft="0.2rem"
                  variant="outline"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </form>
          )}
        />
      </ModalContent>
    </Modal>
  )
}
