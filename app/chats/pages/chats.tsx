import { Flex, Heading, Stack, Text, WrapItem } from "@chakra-ui/react"
import Layout from "../../core/layouts/layout"
import ChatPreview from "../components/chatPreview"
import { Head, useQuery } from "blitz"
import getChatsWithLastMessage from "../queries/getChatsWithLastMessage"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import checkIfUnreadMessage from "app/chats/queries/checkIfUnreadMessages"
import { useLayoutEffect } from "react"

export default function Chats() {
  const [chats] = useQuery(getChatsWithLastMessage, null, { refetchInterval: 2000 })
  const currentUser = useCurrentUser()
  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, {
    refetchInterval: 5000,
  })

  return (
    <>
      <Head>
        <title>entel | Chat</title>
      </Head>
      <Layout hasUnreadMessage={hasUnreadMessage}>
        <Flex alignSelf="center" textAlign="center" direction="column" width="full">
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
          {chats.length != 0 ? (
            <Stack textAlign="left">
              {chats
                .sort((chatA, chatB) => {
                  return chatB.lastMessage!.sentAt.getTime() - chatA.lastMessage!.sentAt.getTime()
                })
                .map((chat) => {
                  return (
                    <ChatPreview
                      chatId={chat.id}
                      userName={
                        chat.participatingUsers.filter((u) => u.id != currentUser?.id)[0].name!
                      }
                      lastMessage={chat.lastMessage!}
                      unreadMessagesCnt={chat.unreadMessagesCnt}
                    />
                  )
                })}
            </Stack>
          ) : (
            <Text>
              Here, you will see your archived lists. But first you have to accept a list or create
              one.
            </Text>
          )}
        </Flex>
      </Layout>
    </>
  )
}

Chats.authenticate = { redirectTo: "/" }
