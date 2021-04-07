import {
  Container,
  Box,
  Flex,
  List,
  ListIcon,
  Heading,
  ListItem,
  Text,
  Badge,
  UnorderedList,
  Link,
  layout,
  Button,
  useDisclosure,
  IconButton,
  CloseButton,
  HStack,
} from "@chakra-ui/react"
import { EditIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons"
import { useMutation, useQuery, useRouter } from "blitz"
import renewList from "../mutations/renewList"
import EditLists from "../components/editList"
import RemoveList from "../components/removeListModal"
import getChatByParticipants from "app/queries/getChatByParticipants"
import { BsArchive } from "react-icons/bs"
import archiveList from "../mutations/archiveList"

interface OwnedListProps {
  marketName: String
  itemsList: String[]
  status: Number
  acceptedName?: string
  acceptedId?: number
  specialWish?: String
  listId: Number
  refetch?
}
export default function OwnedList({
  marketName,
  itemsList,
  status,
  acceptedName,
  acceptedId,
  specialWish,
  listId,
  refetch,
}: OwnedListProps) {
  let statusBadge
  if (status == 1) {
    statusBadge = <Badge colorScheme="green">in progress</Badge>
  } else if (status == 0) {
    statusBadge = <Badge colorScheme="gray">pending</Badge>
  } else {
    statusBadge = <Badge colorScheme="yellow">archived</Badge>
  }
  const [renewListMutation] = useMutation(renewList)
  const [chat] = useQuery(getChatByParticipants, { ownerId: acceptedId })
  const router = useRouter()
  const [archiveListMutation] = useMutation(archiveList)
  return (
    <Flex
      flexDirection="column"
      borderWidth="2px"
      width="sm"
      padding="0.5rem"
      margin="0.5rem"
      borderRadius="lg"
      borderColor="brandGreen.800"
      justifyContent="space-between"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <Box overflow="hidden">
          <Heading color="brandGreen.900" fontSize="3xl">
            {marketName}
          </Heading>
          <UnorderedList>
            {itemsList.map((item) => {
              return <ListItem>{item}</ListItem>
            })}
          </UnorderedList>
          <List>
            {specialWish && (
              <ListItem>
                <ListIcon as={InfoIcon} color="brandGreen.700" /> {specialWish}
              </ListItem>
            )}
            {status == 1 && (
              <ListItem>
                <ListIcon as={InfoIcon} color="brandGreen.700" />
                accepted by <b>{acceptedName}</b>{" "}
                <IconButton
                  aria-label="link chats"
                  variant="brand-chat"
                  size="xs"
                  icon={<ChatIcon />}
                  onClick={() => {
                    console.log("accetor: " + acceptedId)
                    router.push("/chats/[chatId]", "chats/" + chat!.id)
                  }}
                />
              </ListItem>
            )}
          </List>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <HStack>
            {statusBadge}
            {status == 2 && (
              <RemoveList
                modalHeader="Confirmation"
                modalBody="Are you sure you want to delete this Shoppinglist permanently?"
                modalFooter={listId}
              />
            )}
          </HStack>
          <HStack>
            {status == 0 && (
              <IconButton
                size="xs"
                aria-label="archive button"
                icon={<BsArchive />}
                backgroundColor="white"
                _hover={{ backgroundColor: "brandGreen.500", color: "white" }}
                onClick={() => {
                  archiveListMutation(listId)
                }}
              />
            )}
            {status == 0 && (
              <EditLists
                getList={{ id: listId, store: marketName, comment: specialWish, items: itemsList }}
              />
            )}
          </HStack>
        </Flex>
      </Flex>
      {status == 2 && (
        <Button
          variant="brand"
          marginTop="0.5rem"
          onClick={async () => {
            await renewListMutation(listId)
            refetch()
          }}
        >
          Renew
        </Button>
      )}
    </Flex>
  )
}
