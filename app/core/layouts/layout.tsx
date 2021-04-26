import {
  Flex,
  Link,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  useDisclosure,
  HStack,
  Circle,
  Text,
  useToast,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Head, useMutation, useRouter, Image, useQuery } from "blitz"
import logout from "app/auth/mutations/logout"
import { AiFillGithub } from "react-icons/ai"
import { useMediaQuery } from "react-responsive"
import { ChangePassword } from "../../auth/components/changePasswordModal"
import { LoginForm } from "app/auth/components/LoginForm"
import { SignupForm } from "app/auth/components/SignupForm"
import { Link as BlitzLink } from "blitz"
import checkIfUnreadMessage from "app/chats/queries/checkIfUnreadMessages"
import { useCurrentUser } from "../hooks/useCurrentUser"

function Header({ user, isMobile }) {
  return (
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
        alignItems="flex-end"
        marginTop="5px"
      >
        <BlitzLink href="/">
          <Link _hover={{ textDecoration: "none" }}>
            <HStack>
              {(user || !isMobile) && (
                <Image src="/logo_1.png" width="90" alt="entel logo" height="90" />
              )}
              <Heading fontSize="6xl" fontWeight="extrabold" fontFamily="Raleway">
                entel
              </Heading>
            </HStack>
          </Link>
        </BlitzLink>
        <Flex
          direction="row"
          justifyContent="space-between"
          margin="0.5rem"
          paddingX="0.5rem"
          paddingTop="0.5rem"
        >
          <HStack marginRight="1rem">
            {user ? (
              <NavLoggedIn user={user} isMobile={isMobile} />
            ) : (
              <NavLoggedOut user={user} isMobile={isMobile} />
            )}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

function NavLoggedOut({ user, isMobile }) {
  const router = useRouter()
  const toast = useToast()
  return (
    <>
      <SignupForm
        onSuccess={async () => {
          toast({
            title: "Please check your mails",
            description: "Please verify your mail to create your account.",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          await router.push("/")
        }}
      />
      <LoginForm
        onSuccess={async () => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          await router.push(next)
        }}
      />
    </>
  )
}

function NavLoggedIn({ user, isMobile }) {
  const [logoutMutation] = useMutation(logout)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 5000 })

  return (
    <>
      {!isMobile && (
        <>
          <BlitzLink href="/">
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
            >
              Home
            </Link>
          </BlitzLink>
          <BlitzLink href="/activeLists">
            <Link
              textTransform="uppercase"
              fontFamily="Raleway"
              fontWeight="semibold"
              paddingX="0.4rem"
              fontSize="lg"
              borderBottomWidth="0.3rem"
              borderBottomColor={
                window.location.pathname == "/activeLists" ? "brandGreen.500" : "brandSilver.200"
              }
              _hover={{ borderBottomColor: "brandSilver.500" }}
            >
              Active lists
            </Link>
          </BlitzLink>
          <BlitzLink href="/chats">
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
          </BlitzLink>
        </>
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
        <MenuList backgroundColor="brandSilver.100" borderWidth="2px" borderColor="brandSilver.300">
          {isMobile && (
            <>
              <BlitzLink href="/">
                <MenuItem
                  _focus={{ backgroundColor: "brandSilver.200" }}
                  _hover={{ backgroundColor: "brandSilver.200" }}
                >
                  Home
                </MenuItem>
              </BlitzLink>
              <BlitzLink href="/activeLists">
                <MenuItem
                  _focus={{ backgroundColor: "brandSilver.200" }}
                  _hover={{ backgroundColor: "brandSilver.200" }}
                >
                  Active lists
                </MenuItem>
              </BlitzLink>
              <BlitzLink href="/chats">
                <MenuItem
                  _focus={{ backgroundColor: "brandSilver.200" }}
                  _hover={{ backgroundColor: "brandSilver.200" }}
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
              </BlitzLink>
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
          <BlitzLink href="/">
            <MenuItem
              _hover={{ backgroundColor: "brandSilver.200" }}
              onClick={async () => {
                await logoutMutation()
                window.location.reload()
              }}
            >
              Logout
            </MenuItem>
          </BlitzLink>
        </MenuList>
      </Menu>
      <ChangePassword isOpen={isOpen} onClose={onClose} />
    </>
  )
}

function Footer() {
  return (
    <Flex
      padding=".5rem"
      as="footer"
      direction="column"
      backgroundColor="brandGreen.100"
      width="full"
      textAlign="center"
      alignItems="center"
    >
      <Link href="https://github.com/entel-me/entel">
        <HStack>
          <AiFillGithub size={24} />
          <Text>This project is open source. Feel free reach out.</Text>
        </HStack>
      </Link>
      <Text fontFamily="Raleway" fontWeight="medium">
        <BlitzLink href="/impressum">
          <Link>Impressum</Link>
        </BlitzLink>
        {", "}
        <BlitzLink href="/datenschutz">
          <Link>Datenschutz</Link>
        </BlitzLink>{" "}
        und ganz viel Liebe
      </Text>
    </Flex>
  )
}

export default function Layout({ children }) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
  const user = useCurrentUser()
  return (
    <>
      <Head>
        <link rel="icon" href="/logo_1.png" />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="entel, share, shopping, shoppinglist, tool, chat, community"
        />
        <meta name="author" content="Till Bergmann, Antony Kamp" />
        <meta name="copyright" content="Till Bergmann, Antony Kamp" />
        <meta
          name="description"
          content="Share your needs! Replace the unnecessary walk to the next supermarket by a new shoppinglist in entel."
        />
      </Head>
      <Flex direction="column" alignItems="center" height="100vh">
        <Header isMobile={isMobile} user={user} />
        <Flex
          paddingX="0.2rem"
          style={{ width: "min(100vw, 850px)" }}
          flex="1 1 auto"
          direction="column"
          justifyContent="space-between"
        >
          {children}
        </Flex>
        {!(isMobile && window.location.pathname.startsWith("/chats/")) && <Footer />}
      </Flex>
    </>
  )
}
