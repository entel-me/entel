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
  ColorModeScript,
  useColorMode,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons"
import { AuthenticationError, Head, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { useState } from "react"
import changePassword from "app/auth/mutations/changePassword"

function ChangePassword({ isOpen, onClose }) {
  const [changePasswordMutation] = useMutation(changePassword)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const resetOnClose = () => {
    setErrorMessage("")
    setSuccessMessage("")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={resetOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody id="body">
          <FormControl
            id="currentPassword"
            onKeyUp={(e) => {
              e.preventDefault()
              console.log(e.key)
              if (e.key === "Enter") {
                document.getElementById("submitButton")?.click()
              }
            }}
          >
            <FormLabel>Old Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl id="newPassword" marginBottom="0.2rem">
            <FormLabel>Old Password</FormLabel>
            <Input type="password" />
          </FormControl>
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert status="success">
              <AlertIcon />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            id="submitButton"
            type="button"
            onClick={async () => {
              setErrorMessage("")
              setSuccessMessage("")
              const currentPassword = document.getElementById("currentPassword")!.value!
              const newPassword = document.getElementById("newPassword")!.value!
              try {
                await changePasswordMutation({ currentPassword, newPassword })
                setSuccessMessage("Your password changed successfully!")
              } catch (error) {
                if (error instanceof AuthenticationError) {
                  setErrorMessage("Sorry, those credentials are invalid")
                } else {
                  setErrorMessage("On of the passwords is to short.")
                }
              }
            }}
          >
            ChangePassword
          </Button>
          <Button
            marginLeft="0.2rem"
            variant="outline"
            colorScheme="blue"
            mr={3}
            onClick={resetOnClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

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
