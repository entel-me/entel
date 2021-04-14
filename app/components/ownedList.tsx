import {
  Box,
  Flex,
  List,
  ListIcon,
  Heading,
  ListItem,
  UnorderedList,
  Button,
  IconButton,
  HStack,
  createStandaloneToast,
} from "@chakra-ui/react"
import { EditIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons"
import { useMutation, useQuery, useRouter } from "blitz"
import renewList from "../mutations/renewList"
import EditLists from "../components/editList"
import RemoveList from "../components/removeListModal"
import getChatByParticipants from "app/queries/getChatByParticipants"
import { BsArchive } from "react-icons/bs"
import archiveList from "../mutations/archiveList"
import BrandBadge from "./BrandBadge"
import { Link as BlitzLink } from "blitz"
import { appLogger as log } from "app/lib/logger"

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
  const [renewListMutation] = useMutation(renewList)
  const [chat] = useQuery(getChatByParticipants, { ownerId: acceptedId })
  const router = useRouter()
  const [archiveListMutation] = useMutation(archiveList)
  const toast = createStandaloneToast()

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
                <BlitzLink href={"/chats/" + chat!.id}>
                  <IconButton
                    aria-label="link chats"
                    variant="brand-chat"
                    size="xs"
                    icon={<ChatIcon />}
                  />
                </BlitzLink>
              </ListItem>
            )}
          </List>
        </Box>
        <Flex justifyContent="space-between" flexDirection="column" alignItems="flex-end">
          <HStack>
            <BrandBadge status={status} />
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
                onClick={async () => {
                  await archiveListMutation(listId)
                  log.info("The status of a shoppinglist changed from 'pending' to 'archived'")

                  toast({
                    title: "Successfully Archived List",
                    description: "You will find your archived lists under 'Menu/Archived Lists'",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
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
            log.info("The status of a shoppinglist changed from 'archived' to 'pending'")

            toast({
              title: "Successfully Renewed List",
              description: "You will find your published lists under 'Home'",
              status: "success",
              duration: 5000,
              isClosable: true,
            })
          }}
        >
          Renew
        </Button>
      )}
    </Flex>
  )
}
