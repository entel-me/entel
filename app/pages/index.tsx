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
} from "@chakra-ui/react"
import Layout from "../components/layout"
import { useQuery } from "blitz"
import getOwnListByStatus from "../queries/getMyLists"
import OwnedList from "../components/ownedList"
import PublicList from "../components/publicList"
import getAvailableLists from "../queries/getAvailableLists"
import getPosition from "../queries/getPositionOfUser"
import { useState } from "react"
import { getDistanceByHaversine, useCurrentPosition } from "../lib/position"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

function App() {
  const [acceptedLists] = useQuery(getOwnListByStatus, 1, { refetchInterval: 2000 })
  const [pendingLists] = useQuery(getOwnListByStatus, 0, { refetchInterval: 2000 })

  useCurrentPosition()
  const [{ user_latitude, user_longitude }] = useQuery(getPosition, null)
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
                getDistanceByHaversine(
                  user_latitude,
                  user_longitude,
                  listA.createdBy.last_latitude,
                  listA.createdBy.last_longitude
                ) -
                getDistanceByHaversine(
                  user_latitude,
                  user_longitude,
                  listB.createdBy.last_latitude,
                  listB.createdBy.last_longitude
                )
              )
            })
            .slice(0, numLists)
            .map((Shoppinglist) => {
              return (
                <WrapItem>
                  <PublicList
                    distance={Math.ceil(
                      getDistanceByHaversine(
                        user_latitude,
                        user_longitude,
                        Shoppinglist.createdBy.last_latitude,
                        Shoppinglist.createdBy.last_longitude
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
