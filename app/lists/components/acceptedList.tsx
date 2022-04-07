import {
  Box,
  Heading,
  ListItem,
  Flex,
  Text,
  UnorderedList,
  Divider,
  HStack,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react"
import { ChatIcon, InfoIcon } from "@chakra-ui/icons"
import { useMutation, useQuery, useRouter } from "blitz"
import doneList from "../mutations/doneList"
import renewList from "../mutations/renewList"
import createAdminMessage from "app/chats/mutations/createAdminMessage"
import getChatByParticipants from "app/chats/queries/getChatByParticipants"
import { BiShoppingBag, BiUserCircle, BiStore } from "react-icons/bi"
import { getDistanceString } from "app/lib/position"
import { appLogger as log } from "app/lib/logger"

interface AcceptedListProps {
  distance: Number
  marketName: String
  itemsList: String[]
  ownerName: String
  ownerId: Number
  specialWish?: String
  listId: number
  refetch
}
export default function AcceptedList({
  distance,
  marketName,
  itemsList,
  ownerName,
  ownerId,
  specialWish,
  listId,
  refetch,
}: AcceptedListProps) {
  const [doneListMutation] = useMutation(doneList)
  const [undoAcceptMutation] = useMutation(renewList)
  const [createAdminMessageMutation] = useMutation(createAdminMessage)
  const [chat] = useQuery(getChatByParticipants, { ownerId })
  const router = useRouter()
  const toast = useToast()

  return (
    <Flex
      justifyContent="space-between"
      flexDirection="column"
      borderWidth="2px"
      style={{ width: "min(24rem,95vw)" }}
      padding="0.5rem"
      margin="0.5rem"
      borderRadius="lg"
      borderColor="brandGreen.800"
    >
      <Flex justifyContent="space-between" flexDirection="row">
        <Box>
          <Heading color="brandGreen.900" fontSize="2xl">
            {getDistanceString(distance)}
          </Heading>
          <HStack alignItems="baseline">
            <BiUserCircle />
            <Text>
              Owner: <b>{ownerName}</b>{" "}
              <IconButton
                onClick={() => {
                  router.push("/chats/" + chat!.id)
                }}
                aria-label="link-chats"
                variant="brand-chat"
                size="xs"
                icon={<ChatIcon />}
              />
            </Text>
          </HStack>
        </Box>
        <Flex
          wordBreak="break-word"
          justifyContent="space-between"
          flexDirection="column"
          alignItems="flex-end"
        >
          <HStack>
            <Text>{itemsList.length} item(s)</Text>
            <BiShoppingBag />
          </HStack>
          <HStack>
            <Text>{marketName}</Text>
            <BiStore />
          </HStack>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" flexDirection="column">
        <Divider height="0.25rem" color="black" />
        <UnorderedList>
          {itemsList.map((item) => {
            return <ListItem>{item}</ListItem>
          })}
        </UnorderedList>
        {specialWish && (
          <Text>
            <InfoIcon /> {specialWish}
          </Text>
        )}
        <Flex marginTop="0.8rem" flexDirection="row" justifyContent="center">
          <Button
            variant="brand"
            flex={1}
            margin="0.2rem"
            onClick={async () => {
              await doneListMutation({ id: listId })
              await createAdminMessageMutation({
                content: "The helper bought your item. Hurray!",
                chatId: chat!.id,
              })
              refetch()
              toast({
                title: "Successfully Finished List",
                description: "You have successfully finished your task",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
              log.info("The status of a shoppinglist changed from 'in progress' to 'archived'")
            }}
          >
            {" "}
            Done{" "}
          </Button>
          <Button
            variant="brand-close"
            flex={1}
            margin="0.2rem"
            onClick={async () => {
              await undoAcceptMutation({ id: listId })
              await createAdminMessageMutation({
                content: "The list has unfortunately returned to the ' is pending' state",
                chatId: chat!.id,
              })
              refetch()
              toast({
                title: "Successfully Cancelled List",
                description:
                  "You will not need to finish this task. Please be sure to finish your accepted tasks the next time you accept a list. ",
                status: "success",
                duration: 7000,
                isClosable: true,
              })
              log.info("The status of a shoppinglist changed from 'in progress' to 'pending'")
            }}
          >
            {" "}
            Cancel{" "}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
