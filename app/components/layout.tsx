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
} from "@chakra-ui/react"
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons"
import { Head, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"

export default function Layout({ children }) {
  const [logoutMutation] = useMutation(logout)
  const { colorMode, toggleColorMode } = useColorMode()
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
            paddingY="0.5rem"
            margin="1rem"
            paddingY="0.5rem"
            margin="1rem"
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
                <MenuItem
                  onClick={async () => {
                    await logoutMutation()
                  }}
                >
                  Logout{" "}
                </MenuItem>
                <Link href="/archivedLists">
                  <MenuItem>Archived Lists</MenuItem>
                </Link>

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
    </>
  )
}
