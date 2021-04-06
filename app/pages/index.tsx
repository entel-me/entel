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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import Layout from "../components/layout"
import { useQuery } from "blitz"
import getOwnListByStatus from "../queries/getMyLists"
import OwnedList from "../components/ownedList"
import PublicList from "../components/publicList"
import getAvailableLists from "../queries/getAvailableLists"
import getPosition from "../queries/getPositionOfUser"
import { useState } from "react"
import { LoginForm } from "app/auth/components/LoginForm"
import { SignupForm } from "app/auth/components/SignupForm"
import { useRouter } from "blitz"
import { getDistanceByHaversine, useCurrentPosition } from "../lib/position"
import CreateLists from "../components/createLists"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const CustomModal = ({ showModalButtonText, modalHeader, modalBody }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} padding="1rem" borderWidth="0.1rem" borderRadius="md" width="6rem">
        {showModalButtonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

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

  const { isOpen, onOpen, onClose } = useDisclosure()
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
          onClick={onOpen}
          padding="0.4rem"
          marginTop="0.5rem"
          marginBottom="1rem"
          alignSelf="center"
          textAlign="center"
          maxWidth="300px"
          borderWidth="0.1rem"
          borderRadius="md"
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
                    ownerId={Shoppinglist.createdBy.id!}
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
      <CreateLists isOpen={isOpen} onClose={onClose} />
    </Layout>
  )
}

const Welcome: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
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
        <CustomModal
          showModalButtonText="Sign Up"
          modalHeader=""
          modalBody={<SignupForm onSuccess={() => router.push("/")} />}
        />
        <Text>{" - "}</Text>
        <CustomModal
          showModalButtonText="Login"
          modalHeader=""
          modalBody={
            <LoginForm
              onSuccess={() => {
                const next = router.query.next
                  ? decodeURIComponent(router.query.next as string)
                  : "/"
                router.push(next)
              }}
            />
          }
        />
      </HStack>
    </Flex>
  )
}

Welcome.suppressFirstRenderFlicker = true

export default Welcome
