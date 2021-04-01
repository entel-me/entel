import { Suspense } from "react"
import { BlitzPage, useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import {
  Flex,
  Wrap,
  WrapItem,
  Heading,
  Link,
  VStack,
  Text,
  Button,
  HStack,
  Box,
  Center,
} from "@chakra-ui/react"
import { IconButton, SlideFade, useDisclosure } from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import Layout from "../components/layout"
import { useQuery } from "blitz"
import getOwnListByStatus from "../queries/getMyLists"
import OwnedList from "../components/ownedList"
import PublicList from "../components/publicList"
import getAvailableLists from "../queries/getAvailableLists"
import getPosition from "../queries/getPositionOfUser"
import { useState } from "react"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

function pythagoras(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function App() {
  const { isOpen, onToggle } = useDisclosure()
  const [acceptedLists] = useQuery(getOwnListByStatus, 1, { refetchInterval: 2000 })
  const [pendingLists] = useQuery(getOwnListByStatus, 0, { refetchInterval: 2000 })
  const [position] = useQuery(getPosition, null)

  const [availableLists, availableListsExtras] = useQuery(getAvailableLists, null, {
    refetchInterval: 2000,
  })
  const availableListsRefetch = availableListsExtras.refetch

  const [numLists, setNumLists] = useState(10)

  return (
    <Layout>
      <Flex textAlign="left" direction="column" width="full">
        <Heading as="h2" fontSize="3xl" textAlign="center" marginY="0.5rem">
          My lists
        </Heading>
        <Wrap justify="center">
          {acceptedLists.concat(pendingLists).map((Shoppinglist) => {
            return (
              <WrapItem>
                <OwnedList
                  marketName={Shoppinglist.store}
                  status={Shoppinglist.status}
                  acceptedName={
                    Shoppinglist.acceptedBy == null ? undefined : Shoppinglist.acceptedBy!.name!
                  }
                  specialWish={Shoppinglist.comment}
                  itemsList={Shoppinglist.items.map((itemsList) => {
                    return itemsList.name
                  })}
                  listId={Shoppinglist.id}
                />
              </WrapItem>
            )
          })}
        </Wrap>
        <Button
          onClick={() => (window.location.href = "/")}
          padding="0.4rem"
          marginTop="0.5rem"
          marginBottom="1rem"
          alignSelf="center"
          textAlign="center"
          maxWidth="300px"
          borderWidth="0.1rem"
          borderRadius="md"
          as="a"
          href="/"
        >
          Create new list
        </Button>
        <Heading as="h2" fontSize="3xl" textAlign="center">
          Available lists
        </Heading>
        <Wrap justify="center">
          {availableLists
            .sort((listA, listB) => {
              return (
                pythagoras(
                  position.user_x,
                  position.user_y,
                  listA.createdBy.position_x,
                  listA.createdBy.position_x
                ) -
                pythagoras(
                  position.user_x,
                  position.user_y,
                  listB.createdBy.position_x,
                  listB.createdBy.position_x
                )
              )
            })
            .slice(0, numLists)
            .map((Shoppinglist) => {
              return (
                <WrapItem>
                  <PublicList
                    distance={Math.ceil(
                      pythagoras(
                        position.user_x,
                        position.user_y,
                        Shoppinglist.createdBy.position_x,
                        Shoppinglist.createdBy.position_y
                      )
                    )}
                    marketName={Shoppinglist.store}
                    ownerName={Shoppinglist.createdBy.name!}
                    specialWish={Shoppinglist.comment}
                    itemsList={Shoppinglist.items.map((itemsList) => {
                      return itemsList.name
                    })}
                    listId={Shoppinglist.id}
                    refetch={availableListsRefetch}
                  />
                </WrapItem>
              )
            })}
        </Wrap>
        <Button
          padding="0.4rem"
          marginTop="0.5rem"
          marginBottom="1rem"
          alignSelf="center"
          textAlign="center"
          maxWidth="300px"
          borderWidth="0.1rem"
          borderRadius="md"
          onClick={() => {
            setNumLists(numLists + 10)
          }}
        >
          Show more lists
        </Button>
      </Flex>
    </Layout>
  )
}

const Welcome: BlitzPage = () => {
  const currentUser = useCurrentUser()
  if (currentUser) return <App />

  return (
    <Flex
      minHeight="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
    >
      <Heading fontSize="5xl">Farmers' Market</Heading>
      <Text margin="1rem">bla bla bla</Text>
      <HStack align="center">
        <Box padding="1rem" borderWidth="0.1rem" borderRadius="md" width="6rem">
          <Link href="/signup">
            <Text textAlign="center">Sign Up</Text>
          </Link>
        </Box>
        <Text>{" - "}</Text>
        <Link href="/login">
          <Box padding="1rem" borderWidth="0.1rem" borderRadius="md" width="6rem">
            <Text textAlign="center">Login</Text>
          </Box>
        </Link>
      </HStack>
    </Flex>
  )
}

Welcome.suppressFirstRenderFlicker = true

export default Welcome
