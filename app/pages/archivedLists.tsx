import { Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react"
import Layout from "../core/layouts/layout"
import OwnedList from "../lists/components/ownedList"
import getArchivedLists from "../lists/queries/getArchivedLists"
import { Head, useQuery } from "blitz"
import checkIfUnreadMessage from "app/chats/queries/checkIfUnreadMessages"

export default function ArchivedLists() {
  const [archivedLists, archivedListsExtras] = useQuery(getArchivedLists, null, {
    refetchInterval: 2000,
  })
  const archivedListsRefetch = archivedListsExtras.refetch
  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 5000 })
  return (
    <>
      <Head>
        <title>entel | Chat</title>
      </Head>
      <Layout hasUnreadMessage={hasUnreadMessage}>
        <Flex textAlign="left" direction="column" width="full">
          <Heading
            as="h2"
            fontFamily="Raleway"
            fontWeight="bolder"
            fontSize="4xl"
            textAlign="center"
            alignSelf="center"
            marginY="1rem"
          >
            My archived lists
          </Heading>
          <Wrap justify="center">
            {archivedLists.length != 0 ? (
              archivedLists.map((list) => {
                return (
                  <WrapItem>
                    <OwnedList
                      marketName={list.store}
                      itemsList={list.items.map((item) => item.name)}
                      status={2}
                      acceptedName={list.acceptedBy != null ? list.acceptedBy.name! : undefined}
                      acceptedId={list.acceptedBy != null ? list.acceptedBy.id : undefined}
                      specialWish={list.comment}
                      listId={list.id}
                      refetch={archivedListsRefetch}
                    />
                  </WrapItem>
                )
              })
            ) : (
              <Text>Here, you will see your archived lists.</Text>
            )}
          </Wrap>
        </Flex>
      </Layout>
    </>
  )
}

ArchivedLists.authenticate = { redirectTo: "/" }
