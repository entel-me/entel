import { Flex, Heading, Stack, WrapItem } from "@chakra-ui/react"
import Layout from "../components/layout"
import ChatPreview from "../components/chats/chatPreview"
import getArchivedLists from "../queries/getArchivedLists"
import { useQuery } from "blitz"
import getChats from "../queries/getChats"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export default function ArchivedLists() {
  const [chats] = useQuery(getChats, null)

  const currentUser = useCurrentUser()
  return (
    <Layout>
      <Flex alignSelf="center" textAlign="left" direction="column" width="full">
        <Heading
          as="h2"
          fontFamily="Raleway"
          fontWeight="bolder"
          fontSize="4xl"
          textAlign="center"
          alignSelf="center"
          marginY="1rem"
        >
          Chats
        </Heading>
        <Stack>
          {chats.map((chat) => {
            return (
              <ChatPreview
                chatId={chat.id}
                userName={chat.participatingUsers.filter((u) => u.id != currentUser?.id)[0].name!}
              />
            )
          })}
        </Stack>
      </Flex>
    </Layout>
  )
}
