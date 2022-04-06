import { Flex, Heading, Stack, HStack, Text, Textarea, IconButton, Box } from "@chakra-ui/react"
import AdminMessage from "app/chats/components/adminMessage"
import OwnMessage from "app/chats/components/ownMessage"
import StrangeMessage from "app/chats/components/strangeMessage"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getMessagesByChat from "app/chats/queries/getMessagesByChat"
import { useQuery, useParam, useMutation, Head, AuthorizationError, NotFoundError, AuthenticationError } from "blitz"
import { Form, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import getParticipantsByChatId from "../../chats/queries/getParticipantsByChatId"
import sendMessage from "../../chats/mutations/sendMessage"
import markMessagesAsRead from "../../chats/mutations/markMessagesAsRead"
import { useEffect } from "react"
import { RiMailSendLine } from "react-icons/ri"
import { BiUserCircle } from "react-icons/bi"
import markAdminMessagesAsRead from "app/chats/mutations/markAdminAsRead"
import { appLogger as log } from "app/lib/logger"

export default function Chat() {
  const chatId = useParam("chatId", "number")
  if(!chatId)
    throw new NotFoundError("Invalid id.")

  const currentUser = useCurrentUser()
  if(!currentUser)
    throw new AuthenticationError("Please login or signup.")
  
  const [participants] = useQuery(getParticipantsByChatId, { id: chatId })
  if(!participants)
    throw new NotFoundError("This chat doesn't exists.")
  if (!participants.map((part) => part.id).includes(currentUser.id))
    throw new AuthorizationError("You're not part of this chat.")

  const oppositeName = participants.filter((part) => part.id != currentUser.id)[0]
  const [messages, messagesExtra] = useQuery(
    getMessagesByChat,
    { chatId },
    { staleTime: 1000 }
  )
  const [sendMessageMutation] = useMutation(sendMessage)

  const [markMessagesAsReadMutation] = useMutation(markMessagesAsRead)
  const [markAdminMessagesAsReadMutation] = useMutation(markAdminMessagesAsRead)

  useEffect(() => {
    markMessagesAsReadMutation({ chatId })
    markAdminMessagesAsReadMutation({ chatId })
    const message = document.getElementById("messages")!
    message.scrollTop = message.scrollHeight
  }, [messages])

  return (
    <>
      <Head>
        <title>entel | Chat</title>
      </Head>
      <Flex
        textAlign="center"
        direction="column"
        width="full"
        maxWidth="600px"
        alignSelf="center"
        style={{ maxHeight: "calc(100vh - 100px" }}
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
          display="flex"
          flexDirection="column"
          overflowY="auto"
          borderRadius="5px"
          borderWidth="2px"
          borderColor="brandSilver.500"
          flex={["1 1 auto", "unset"]}
        >
          <Stack
            id="messages"
            width="full"
            overflowY="auto"
            padding="0.5rem"
            borderColor="brandSilver.300"
            borderBottomWidth="2px"
          >
            {messages.map((m) => {
              if (!m.sentFrom) {
                return <AdminMessage content={m.content} timeStamp={m.sentAt} />
              } else if (m.sentFrom.id == currentUser.id) {
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
              })
              log.warn("A message was sent successfully.")

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
    </>
  )
}

Chat.authenticate = { redirectTo: "/" }
