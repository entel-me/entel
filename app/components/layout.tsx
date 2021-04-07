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
  Box,
  HStack,
  Circle,
  Text,
} from "@chakra-ui/react"
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons"
import { AuthenticationError, Head, useMutation, useQuery } from "blitz"
import logout from "app/auth/mutations/logout"

import { useMediaQuery } from "react-responsive"
import { ChangePassword } from "./changePasswordModal"
import checkIfUnreadMessage from "app/queries/checkIfUnreadMessages"

export default function Layout({ children }) {
  const [logoutMutation] = useMutation(logout)
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 5000 })
  const menuLinks: { name: string; link: string }[] = [
    { name: "Home", link: "/" },
    { name: "Active lists", link: "/activeLists" },
    { name: "Chats", link: "/chats" },
  ]
  return (
    <>
      <Head>
        <title>{"Farmers' Market"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeScript initialColorMode="light" />
      <Flex direction="column" alignItems="center">
        <Flex
          as="header"
          boxShadow="0 0 0 4px #ECECEC"
          backgroundColor="brandGreen.100"
          width="full"
          justifyContent="center"
        >
          <Flex
            width={["100vw", "850px"]}
            direction="row"
            justifyContent="space-between"
            alignItems="self-end"
          >
            <Heading fontSize="6xl" fontWeight="extrabold" fontFamily="Raleway">
              entel
            </Heading>
            <Flex
              direction="row"
              justifyContent="space-between"
              margin="0.5rem"
              paddingX="0.5rem"
              paddingTop="0.5rem"
            >
              {!isMobile && (
                <HStack marginRight="1rem">
                  <Link
                    textTransform="uppercase"
                    fontFamily="Raleway"
                    fontWeight="semibold"
                    paddingX="0.4rem"
                    fontSize="lg"
                    borderBottomWidth="0.3rem"
                    borderBottomColor={
                      window.location.pathname == "/" ? "brandGreen.500" : "brandSilver.200"
                    }
                    _hover={{ borderBottomColor: "brandSilver.500" }}
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    textTransform="uppercase"
                    fontFamily="Raleway"
                    fontWeight="semibold"
                    paddingX="0.4rem"
                    fontSize="lg"
                    borderBottomWidth="0.3rem"
                    borderBottomColor={
                      window.location.pathname == "/activeLists"
                        ? "brandGreen.500"
                        : "brandSilver.200"
                    }
                    _hover={{ borderBottomColor: "brandSilver.500" }}
                    href="/activeLists"
                  >
                    Active lists
                  </Link>
                  <Link
                    textTransform="uppercase"
                    fontFamily="Raleway"
                    fontWeight="semibold"
                    paddingX="0.3rem"
                    fontSize="lg"
                    borderBottomWidth="0.3rem"
                    paddingRight={hasUnreadMessage ? "0" : "0.3rem"}
                    borderBottomColor={
                      window.location.pathname == "/chats" ? "brandGreen.500" : "brandSilver.200"
                    }
                    _hover={{ borderBottomColor: "brandSilver.500" }}
                    href="/chats"
                  >
                    <HStack>
                      <Text>Chats</Text>
                      {hasUnreadMessage && (
                        <Circle
                          style={{ marginInlineStart: "0" }}
                          alignSelf="start"
                          size=".3rem"
                          bg="brandChestnut.500"
                        />
                      )}
                    </HStack>
                  </Link>
                </HStack>
              )}
              <Menu placement="bottom-end" closeOnBlur={true}>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  size="sm"
                  variant="solid"
                  backgroundColor="brandSilver.100"
                  _hover={{ backgroundColor: "brandGreen.200" }}
                  _active={{ backgroundColor: "brandGreen.100" }}
                  borderColor="brandSilver.400"
                  borderWidth="2px"
                  borderRadius="3px"
                />
                <MenuList
                  backgroundColor="brandSilver.100"
                  borderWidth="2px"
                  borderColor="brandSilver.300"
                >
                  {isMobile && (
                    <>
                      <MenuItem
                        _focus={{ backgroundColor: "brandSilver.200" }}
                        _hover={{ backgroundColor: "brandSilver.200" }}
                        onClick={() => (window.location.href = "/")}
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                        _focus={{ backgroundColor: "brandSilver.200" }}
                        _hover={{ backgroundColor: "brandSilver.200" }}
                        onClick={() => (window.location.href = "/activeLists")}
                      >
                        Active lists
                      </MenuItem>
                      <MenuItem
                        _focus={{ backgroundColor: "brandSilver.200" }}
                        _hover={{ backgroundColor: "brandSilver.200" }}
                        onClick={() => (window.location.href = "/chats")}
                      >
                        <HStack>
                          <Text>Chats</Text>
                          {hasUnreadMessage && (
                            <Circle
                              style={{ marginInlineStart: "0" }}
                              alignSelf="start"
                              size=".3rem"
                              bg="brandChestnut.500"
                            />
                          )}
                        </HStack>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem
                    _focus={{ backgroundColor: "brandSilver.200" }}
                    _hover={{ backgroundColor: "brandSilver.200" }}
                    onClick={() => (window.location.href = "/archivedLists")}
                  >
                    Archived Lists
                  </MenuItem>
                  <MenuItem _hover={{ backgroundColor: "brandSilver.200" }} onClick={onOpen}>
                    Change Password
                  </MenuItem>
                  <MenuItem
                    _hover={{ backgroundColor: "brandSilver.200" }}
                    onClick={async () => {
                      window.location.href = "/"
                      await logoutMutation()
                    }}
                  >
                    Logout{" "}
                  </MenuItem>
                  {/*<MenuItem>
                  {" "}
                  <IconButton
                    aria-label="light-mode"
                    icon={<SunIcon />}
                    onClick={toggleColorMode}
                  />
                </MenuItem>*/}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
        <Flex width={["100vw", "850px"]} grow={1} direction="column" justifyContent="space-between">
          {children}
        </Flex>
      </Flex>

      <ChangePassword isOpen={isOpen} onClose={onClose} />
    </>
  )
}
