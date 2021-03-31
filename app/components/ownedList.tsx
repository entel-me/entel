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
} from "@chakra-ui/react"
import { EditIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons"
import { useMutation } from "blitz"
import renewList from "../mutations/renewList"

interface OwnedListProps {
  marketName: String
  itemsList: String[]
  status: Number
  acceptedName?: String
  specialWish?: String
  listId: Number
}
export default function OwnedList({
  marketName,
  itemsList,
  status,
  acceptedName,
  specialWish,
  listId,
}: OwnedListProps) {
  let statusBadge
  if (status == 1) {
    statusBadge = <Badge colorScheme="green">in progress</Badge>
  } else if (status == 0) {
    statusBadge = <Badge colorScheme="gray">pending</Badge>
  } else {
    statusBadge = <Badge colorScheme="blue">archived</Badge>
  }
  const [renewListMutation] = useMutation(renewList)

  return (
    <Flex
      flexDirection="column"
      borderWidth="4px"
      width="sm"
      padding="0.5rem"
      margin="0.5rem"
      borderRadius="lg"
      borderColor="gray.500"
      justifyContent="space-between"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <Heading fontSize="3xl">{marketName}</Heading>
          <UnorderedList>
            {itemsList.map((item) => {
              return <ListItem>{item}</ListItem>
            })}
          </UnorderedList>
          <List>
            {specialWish && (
              <ListItem>
                <ListIcon as={InfoIcon} /> {specialWish}
              </ListItem>
            )}
            {status == 1 && (
              <ListItem>
                <ListIcon as={InfoIcon} />
                angenommen von <b>{acceptedName}</b>{" "}
                <Link href="/">
                  <ChatIcon />
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          {statusBadge}
          {status == 0 && (
            <Link href="/">
              <EditIcon />
            </Link>
          )}
        </Flex>
      </Flex>
      {status == 2 && (
        <Button marginTop="0.5rem" onClick={async () => renewListMutation(listId)}>
          Renew
        </Button>
      )}
    </Flex>
  )
}
