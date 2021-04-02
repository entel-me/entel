import {
  Box,
  Heading,
  ListItem,
  Flex,
  Text,
  UnorderedList,
  Collapse,
  useDisclosure,
  Divider,
  Button,
  List,
} from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"
import { useMutation } from "blitz"
import doneList from "../mutations/doneList"

interface AcceptedListProps {
  distance: Number
  marketName: String
  itemsList: String[]
  ownerName: String
  specialWish?: String
  listId: Number
  refetch
}
export default function AcceptedList({
  distance,
  marketName,
  itemsList,
  ownerName,
  specialWish,
  listId,
  refetch,
}: AcceptedListProps) {
  const [doneListMutation] = useMutation(doneList)

  return (
    <Flex
      justifyContent="space-between"
      flexDirection="column"
      borderWidth="4px"
      width="sm"
      padding="0.5rem"
      margin="0.5rem"
      borderRadius="lg"
      borderColor="gray.500"
    >
      <Flex justifyContent="space-between" flexDirection="row">
        <Box>
          <Heading fontSize="2xl">{Number.isNaN(distance) ? "∞" : distance} km</Heading>
          <Text>{ownerName}</Text>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <Text>{itemsList.length} items</Text>
          <Text>{marketName}</Text>
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
        <Button
          marginTop="0.5rem"
          onClick={async () => {
            await doneListMutation(listId)
            refetch()
          }}
        >
          {" "}
          Done{" "}
        </Button>
      </Flex>
    </Flex>
  )
}
