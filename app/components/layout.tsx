import {
  Flex,
  Link,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Head, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"

export default function Layout({ children }) {
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <Head>
        <title>{"Farmers' Market"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" alignItems="center">
        <Heading fontSize="2xl" marginBottom="1rem">
          Farmers' Market
        </Heading>
        <Flex
          style={{ width: "100vw" > "850px" ? "100vw" : "850px" }}
          grow={1}
          direction="column"
          justifyContent="space-between"
        >
          <Flex
            borderWidth="0.2rem"
            borderRadius="lg"
            direction="row"
            justifyContent="space-between"
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
              </MenuList>
            </Menu>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
