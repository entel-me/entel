import { Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react"
import Layout from "../components/layout"
import OwnedList from "../components/ownedList"
import getArchivedLists from "../queries/getArchivedLists"
import { useQuery } from "blitz"

export default function ArchivedLists() {
  const [archivedLists, archivedListsExtras] = useQuery(getArchivedLists, null, {
    refetchInterval: 2000,
  })
  const archivedListsRefetch = archivedListsExtras.refetch
  return (
    <Layout>
      <Flex textAlign="left" direction="column" width="full">
        <Heading as="h2" fontSize="3xl" textAlign="center" marginY="0.5rem">
          My archived lists
        </Heading>
        <Wrap justify="center">
          {archivedLists.map((list) => {
            return (
              <WrapItem>
                <OwnedList
                  marketName={list.store}
                  itemsList={list.items.map((item) => item.name)}
                  status={2}
                  acceptedName={list.acceptedBy!.name!}
                  specialWish={list.comment}
                  listId={list.id}
                  refetch={archivedListsRefetch}
                />
              </WrapItem>
            )
          })}
        </Wrap>
      </Flex>
    </Layout>
  )
}
