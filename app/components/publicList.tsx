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
import acceptList from "../mutations/acceptList"

interface PublicListProps {
  distance: Number
  marketName: String
  itemsList: String[]
  ownerName: String
  specialWish?: String
  listId: Number
}
export default function PublicList({
  distance,
  marketName,
  itemsList,
  ownerName,
  specialWish,
  listId,
}: PublicListProps) {
  const { isOpen, onToggle } = useDisclosure()
  const [acceptListMutation] = useMutation(acceptList)
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
      onClick={onToggle}
    >
      <Flex justifyContent="space-between" flexDirection="row">
        <Box>
          <Heading fontSize="2xl">{distance} km</Heading>
          <Text>{ownerName}</Text>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <Text>{itemsList.length} items</Text>
          <Text>{marketName}</Text>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
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
          <Button marginTop="0.5rem" onClick={async () => acceptListMutation(listId)}>
            {" "}
            Accept{" "}
          </Button>
        </Flex>
      </Collapse>
    </Flex>
  )
}
