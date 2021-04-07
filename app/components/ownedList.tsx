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
import { useMutation } from "blitz"
import renewList from "../mutations/renewList"
import EditLists from "../components/editList"
import RemoveList from "../components/removeListModal"

interface OwnedListProps {
  marketName: String
  itemsList: String[]
  status: Number
  acceptedName?: String
  specialWish?: String
  listId: Number
  refetch?
}
export default function OwnedList({
  marketName,
  itemsList,
  status,
  acceptedName,
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
                angenommen von <b>{acceptedName}</b>{" "}
                <Link href="/">
                  <ChatIcon />
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <HStack>
            {statusBadge}
            {status == 0 && (
              <RemoveList
                modalHeader="Confirmation"
                modalBody="Are you sure you want to delete this Shoppinglist permanently?"
                modalFooter={listId}
              />
            )}
          </HStack>
          {status == 0 && (
            <EditLists
              getList={{ id: listId, store: marketName, comment: specialWish, items: itemsList }}
            />
          )}
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
