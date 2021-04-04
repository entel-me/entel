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
import { useState } from "react"

interface PublicListProps {
  distance: Number
  marketName: String
  itemsList: String[]
  ownerName: String
  specialWish?: String
  listId: Number
  refetch
}
export default function PublicList({
  distance,
  marketName,
  itemsList,
  ownerName,
  specialWish,
  listId,
  refetch,
}: PublicListProps) {
  const { isOpen, onToggle } = useDisclosure()
  const [isHovered, onHover] = useState(false)
  const [acceptListMutation] = useMutation(acceptList)
  return (
    <Flex
      justifyContent="space-between"
      overflow="hidden"
      flexDirection="column"
      borderWidth="4px"
      width="sm"
      margin="0.5rem"
      borderRadius="lg"
      borderColor="gray.500"
      onClick={onToggle}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <Flex padding="0.5rem" justifyContent="space-between" flexDirection="row">
        <Box>
          <Heading fontSize="2xl">
            {Number.isNaN(distance) ? "∞" : distance == 0 ? "< 1" : distance} km
          </Heading>
          <Text>{ownerName}</Text>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <Text>{itemsList.length} items</Text>
          <Text>{marketName}</Text>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex padding="0.5rem" justifyContent="space-between" flexDirection="column">
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
              await acceptListMutation(listId)
              refetch()
            }}
          >
            {" "}
            Accept{" "}
          </Button>
        </Flex>
      </Collapse>
      <Collapse in={isHovered && !isOpen} animateOpacity>
        <Flex
          textAlign="center"
          justifyContent="center"
          _hover={{ background: "gray.200" }}
          backgroundColor="gray.100"
          flexDirection="column"
          height="1.5rem"
        >
          <Text fontSize="1rem" fontWeight="semibold">
            show more
          </Text>
        </Flex>
      </Collapse>
    </Flex>
  )
}
