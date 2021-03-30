import {
  Container,
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  Badge,
  UnorderedList,
  Link,
} from "@chakra-ui/react"
import { EditIcon, ChatIcon } from "@chakra-ui/icons"

interface OwnedListProps {
  marketName: String
  itemsList: String[]
  status: Number
  acceptedName?: String
}
export default function OwnedList({ marketName, itemsList, status, acceptedName }: OwnedListProps) {
  let statusBadge
  if (status == 1) {
    statusBadge = <Badge colorScheme="green">in progress</Badge>
  } else if (status == 0) {
    statusBadge = <Badge colorScheme="gray">pending</Badge>
  } else {
    statusBadge = <Badge colorScheme="blue">archived</Badge>
  }

  return (
    <Flex
      justifyContent="space-between"
      flexDirection="row"
      borderWidth="4px"
      width="sm"
      padding="0.5rem"
      margin="0.5rem"
      borderRadius="lg"
      borderColor="gray.500"
    >
      <Box>
        <Heading fontSize="3xl">{marketName}</Heading>
        <UnorderedList>
          {itemsList.map((item) => {
            return <ListItem>{item}</ListItem>
          })}
        </UnorderedList>
        {status == 1 && (
          <Text>
            ~angenommen von {acceptedName}{" "}
            <Link href="/">
              <ChatIcon />
            </Link>
          </Text>
        )}
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
  )
}
