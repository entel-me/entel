import { BlitzPage, Head, useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { Flex, Wrap, WrapItem, Heading, Text, Button, HStack } from "@chakra-ui/react"
import Layout from "../core/layouts/layout"
import { useQuery } from "blitz"
import getOwnListByStatus from "../lists/queries/getMyLists"
import OwnedList from "../lists/components/ownedList"
import PublicList from "../lists/components/publicList"
import getAvailableLists from "../lists/queries/getAvailableLists"
import getPosition from "../core/queries/getPositionOfUser"
import { useEffect, useState } from "react"
import { LoginForm } from "app/auth/components/LoginForm"
import { SignupForm } from "app/auth/components/SignupForm"
import { useRouter } from "blitz"
import { getDistanceByHaversine, useCurrentPosition } from "../lib/position"
import CreateLists from "../lists/components/createLists"
import FrontPage from "../landingPage/components/frontPage"
import checkIfUnreadMessage from "app/chats/queries/checkIfUnreadMessages"
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

  const [numLists, setNumLists] = useState(10)

  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 5000 })
  return (
    <>
      <Head>
        <title>entel | Home</title>
      </Head>
      <Layout hasUnreadMessage={hasUnreadMessage}>
        <Flex direction="column" width="full" textAlign="center">
          <Heading
            as="h2"
            fontFamily="Raleway"
            fontWeight="bolder"
            fontSize="4xl"
            alignSelf="center"
            marginY="1rem"
          >
            My lists
          </Heading>
          {acceptedLists.concat(pendingLists).length != 0 ? (
            <Wrap textAlign="left" justify="center">
              {acceptedLists.concat(pendingLists).map((Shoppinglist) => {
                return (
                  <WrapItem>
                    <OwnedList
                      marketName={Shoppinglist.store}
                      status={Shoppinglist.status}
                      acceptedName={
                        Shoppinglist.acceptedBy == null ? undefined : Shoppinglist.acceptedBy!.name!
                      }
                      acceptedId={
                        Shoppinglist.acceptedBy == null ? undefined : Shoppinglist.acceptedBy!.id!
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
          ) : (
            <Text>Here, you can see lists created by you.</Text>
          )}
          <CreateLists />
          <Heading
            as="h2"
            fontFamily="Raleway"
            fontWeight="bolder"
            fontSize="4xl"
            alignSelf="center"
            marginY="1rem"
          >
            Available lists
          </Heading>
          {availableLists.length != 0 ? (
            <Wrap justify="center" textAlign="left">
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
                        distance={Math.floor(
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
                        refetch={availableListsExtras.refetch}
                        ownerId={Shoppinglist.createdBy.id!}
                      />
                    </WrapItem>
                  )
                })}
            </Wrap>
          ) : (
            <Text>Opps. It looks like no lists are available.</Text>
          )}
          <Button
            variant="brand"
            padding="0.4rem"
            marginTop="0.5rem"
            marginBottom="1rem"
            alignSelf="center"
            textAlign="center"
            maxWidth="300px"
            borderRadius="md"
            onClick={() => {
              setNumLists(numLists + 10)
            }}
          >
            Show more lists
          </Button>
        </Flex>
      </Layout>
    </>
  )
}

const Welcome: BlitzPage = () => {
  const currentUser = useCurrentUser()
  if (currentUser) return <App />
  return (
    <>
      <Head>
        <title>entel | Home</title>
      </Head>
      <Layout user={false}>
        <FrontPage />
      </Layout>
    </>
  )
}

Welcome.suppressFirstRenderFlicker = true

export default Welcome
