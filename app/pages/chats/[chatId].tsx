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
} from "@chakra-ui/react"
import AdminMessage from "app/components/chats/adminMessage"
import OwnMessage from "app/components/chats/ownMessage"
import StrangeMessage from "app/components/chats/strangeMessage"
import Layout from "app/components/layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getMessagesByChat from "app/queries/getMessagesByChat"
import { useQuery, useParam, useMutation } from "blitz"
import { Form, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import getParticipantsByChatId from "../../queries/getParticipantsByChatId"
import sendMessage from "../../mutations/sendMessage"
import { useEffect } from "react"

export default function ArchivedLists() {
  const chatId = useParam("chatId", "number")
  const currentUser = useCurrentUser()
  const [participants] = useQuery(getParticipantsByChatId, { id: chatId! })

  if (!participants.map((part) => part.id).includes(currentUser!.id)) {
    window.location.href = "/"
  }

  const oppositeName = participants.filter((part) => part.id != currentUser?.id)[0]
  const [messages, messagesExtra] = useQuery(getMessagesByChat, { chatId })
  const [sendMessageMutation] = useMutation(sendMessage)

  useEffect(() => {
    const message = document.getElementById("messages")!
    message.scrollTop = message.scrollHeight
  })

  return (
    <Layout>
      <Flex textAlign="center" direction="column" width="full" maxWidth="600px" alignSelf="center">
        <Heading as="h2" fontSize="3xl" textAlign="center" alignSelf="center" marginY="0.5rem">
          <HStack align="center">
            <Text>Your Chat With </Text>
            <Text fontWeight="extrabold">{oppositeName.name}</Text>
          </HStack>
        </Heading>
        <Stack
          id="messages"
          width="full"
          overflowY="auto"
          maxHeight="800px"
          borderRadius="10px"
          padding="0.5rem"
          borderWidth="2px"
          marginY="1rem"
        >
          {messages.map((m) => {
            if (!m.sentFrom) {
              return <AdminMessage content={m.content} />
            } else if (m.sentFrom.id == currentUser!.id) {
              return (
                <OwnMessage content={m.content} timeStamp={m.sentAt} userName={m.sentFrom.name!} />
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
              <HStack alignItems="top">
                <Field name="content">
                  {({ input }) => {
                    return (
                      <Stack flex="1" width="full">
                        <Textarea
                          pr="4.5rem"
                          isFullWidth
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
                  disabled={submitting || pristine}
                  icon={<ArrowRightIcon />}
                />
              </HStack>
            </form>
          )}
        />
      </Flex>
    </Layout>
  )
}
