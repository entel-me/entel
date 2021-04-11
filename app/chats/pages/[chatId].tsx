import { ArrowRightIcon } from "@chakra-ui/icons"
import {
  Flex,
  Heading,
  Stack,
  HStack,
  Text,
  Textarea,
  IconButton,
  useToast,
  Box,
} from "@chakra-ui/react"
import AdminMessage from "app/chats/components/adminMessage"
import OwnMessage from "app/chats/components/ownMessage"
import StrangeMessage from "app/chats/components/strangeMessage"
import Layout from "app/core/layouts/layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getMessagesByChat from "app/chats/queries/getMessagesByChat"
import { useQuery, useParam, useMutation, Head } from "blitz"
import { Form, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import getParticipantsByChatId from "../queries/getParticipantsByChatId"
import sendMessage from "../mutations/sendMessage"
import markMessagesAsRead from "../mutations/markMessagesAsRead"
import { useEffect, useLayoutEffect } from "react"
import { RiMailSendLine } from "react-icons/ri"
import { BiUserCircle } from "react-icons/bi"
import markAdminMessagesAsRead from "app/chats/mutations/markAdminAsRead"
import checkIfUnreadMessage from "app/chats/queries/checkIfUnreadMessages"

export default function Chat() {
  const chatId = useParam("chatId", "number")
  const currentUser = useCurrentUser()
  const [participants] = useQuery(getParticipantsByChatId, { id: chatId! })

  if (!participants.map((part) => part.id).includes(currentUser!.id)) {
    window.location.href = "/"
  }

  const oppositeName = participants.filter((part) => part.id != currentUser?.id)[0]
  const [messages, messagesExtra] = useQuery(
    getMessagesByChat,
    { chatId },
    { refetchInterval: 1000 }
  )
  const [sendMessageMutation] = useMutation(sendMessage)

  const [markMessagesAsReadMutation] = useMutation(markMessagesAsRead)
  const [markAdminMessagesAsReadMutation] = useMutation(markAdminMessagesAsRead)
  useEffect(() => {
    markMessagesAsReadMutation({ chatId })
    markAdminMessagesAsReadMutation({ chatId })
  }, [messages])

  useLayoutEffect(() => {
    const message = document.getElementById("messages")!
    message.scrollTop = message.scrollHeight
  })

  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 2000 })

  return (
    <>
      <Head>
        <title>entel | Chat</title>
      </Head>
      <Layout showFooter={false} hasUnreadMessage={hasUnreadMessage}>
        <Flex
          textAlign="center"
          direction="column"
          width="full"
          maxWidth="600px"
          alignSelf="center"
        >
          <Heading
            as="h2"
            fontFamily="Raleway"
            fontWeight="bolder"
            fontSize="4xl"
            textAlign="center"
            alignSelf="center"
            marginY="1rem"
          >
            <HStack>
              <BiUserCircle />
              <Text>{oppositeName.name}</Text>
            </HStack>
          </Heading>
          <Box
            borderRadius="5px"
            borderWidth="2px"
            borderColor="brandSilver.500"
            flex={["1 1 auto", "unset"]}
          >
            <Stack
              id="messages"
              width="full"
              overflowY="auto"
              maxHeight="800px"
              padding="0.5rem"
              borderColor="brandSilver.300"
              borderBottomWidth="2px"
            >
              {messages.map((m) => {
                if (!m.sentFrom) {
                  return <AdminMessage content={m.content} timeStamp={m.sentAt} />
                } else if (m.sentFrom.id == currentUser!.id) {
                  return (
                    <OwnMessage
                      content={m.content}
                      timeStamp={m.sentAt}
                      userName={m.sentFrom.name!}
                    />
                  )
                } else {
                  return (
                    <StrangeMessage
                      content={m.content}
                      timeStamp={m.sentAt}
                      userName={m.sentFrom.name!}
                    />
                  )
                }
              })}
            </Stack>
            <Form
              onSubmit={async (values) => {
                if (!values.content)
                  return { [FORM_ERROR]: "Don't you want to send your friend a message?" }

                await sendMessageMutation({
                  content: values.content,
                  chatId: chatId,
                  partId: oppositeName.id,
                })
                messagesExtra.refetch()
              }}
              initialValues={{ content: "" }}
              render={({ submitError, handleSubmit, submitting, pristine, form }) => (
                <form
                  onSubmit={(ev) => {
                    handleSubmit(ev)
                    form.reset()
                  }}
                >
                  <HStack padding="0.5rem" alignItems="top">
                    <Field name="content">
                      {({ input }) => {
                        return (
                          <Stack flex="1" width="full">
                            <Textarea
                              resize="none"
                              isfullwidth="true"
                              _focus={{ boxShadow: "0 0 0 2px #787878" }}
                              _hover={{ boxShadow: "0 0 0 2px #787878" }}
                              borderWidth="1px"
                              borderColor="#787878"
                              {...input}
                              placeholder="Please type your message in here"
                            />
                            {submitError && (
                              <Text fontSize="sm" textColor="red">
                                {submitError}
                              </Text>
                            )}
                          </Stack>
                        )
                      }}
                    </Field>
                    <IconButton
                      aria-label="submit"
                      type="submit"
                      variant="brand"
                      _disabled={{ _hover: { color: "#787878", cursor: "not-allowed" } }}
                      disabled={submitting || pristine}
                      icon={<RiMailSendLine />}
                    />
                  </HStack>
                </form>
              )}
            />
          </Box>
        </Flex>
      </Layout>
    </>
  )
}

Chat.authenticate = { redirectTo: "/" }
