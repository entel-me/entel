import { Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react"
import OwnedList from "../lists/components/ownedList"
import getArchivedLists from "../lists/queries/getArchivedLists"
import { Head, useQuery } from "blitz"

export default function ArchivedLists() {
  const [archivedLists, archivedListsExtras] = useQuery(getArchivedLists, null)
  return (
    <>
      <Head>
        <title>entel | Chat</title>
      </Head>
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
                    refetch={archivedListsExtras.refetch}
                  />
                </WrapItem>
              )
            })
          ) : (
            <Text>Here, you will see your archived lists.</Text>
          )}
        </Wrap>
      </Flex>
    </>
  )
}

ArchivedLists.authenticate = { redirectTo: "/" }
