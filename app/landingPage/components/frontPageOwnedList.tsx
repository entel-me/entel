import {
  Box,
  Flex,
  List,
  ListIcon,
  Heading,
  ListItem,
  UnorderedList,
  IconButton,
  HStack,
} from "@chakra-ui/react"
import { EditIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons"
import { BsArchive } from "react-icons/bs"
import BrandBadge from "../../lists/components/brandBadge"

interface OwnedListProps {
  marketName: String
  itemsList: String[]
  status: Number
  acceptedName?: string
  specialWish?: String
}
export default function OwnedList({
  marketName,
  itemsList,
  status,
  acceptedName,
  specialWish,
}: OwnedListProps) {
  return (
    <Flex
      flexDirection="column"
      borderWidth="2px"
      style={{ width: "min(24rem,95vw)" }}
      padding="0.5rem"
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
                accepted by <b>{acceptedName}</b> <ChatIcon varian="brand-chat" size="xs" />
              </ListItem>
            )}
          </List>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <HStack>
            <BrandBadge status={status} />
          </HStack>
          <HStack>
            {status == 0 && (
              <IconButton
                size="xs"
                aria-label="archive button"
                icon={<BsArchive />}
                backgroundColor="white"
                _hover={{ backgroundColor: "brandGreen.500", color: "white" }}
              />
            )}
            {status == 0 && (
              <IconButton
                icon={<EditIcon />}
                size="xs"
                variant="brand-ghost"
                aria-label="Edit List"
              />
            )}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}
