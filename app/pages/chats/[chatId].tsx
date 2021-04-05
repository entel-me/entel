import { ArrowRightIcon } from "@chakra-ui/icons"
import {
  Flex,
  Heading,
  Stack,
  HStack,
  Text,
  Box,
  Textarea,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react"
import AdminMessage from "app/components/chats/adminMessage"
import OwnMessage from "app/components/chats/ownMessage"
import StrangeMessage from "app/components/chats/strangeMessage"
import Layout from "app/components/layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getMessagesByChat from "app/queries/getMessagesByChat"
import { useQuery, useParam, useMutation } from "blitz"
import { Form, Field } from "react-final-form"
import getUserByChatId from "../../queries/getUserByChatId"
import sendMessage from "../../mutations/sendMessage"

export default function ArchivedLists() {
  const chatId = useParam("chatId", "number")
  const [oppositeName] = useQuery(getUserByChatId, { id: chatId! })
  const [messages] = useQuery(getMessagesByChat, { chatId })
  const currentUser = useCurrentUser()
  const [sendMessageMutation] = useMutation(sendMessage)

  return (
    <Layout>
      <Flex textAlign="center" direction="column" width="full" maxWidth="600px" alignSelf="center">
        <Heading as="h2" fontSize="3xl" textAlign="center" alignSelf="center" marginY="0.5rem">
          <HStack align="center">
            <Text>Your Chat With </Text>
            <Text fontWeight="extrabold">{oppositeName.name}</Text>
          </HStack>
        </Heading>
        <Stack width="full" height="800px" overflowY="scroll">
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
            await sendMessageMutation({
              content: values.content,
              chatId: chatId,
              partId: oppositeName.id,
            })
          }}
          validate={(values) => {
            const errors = {}
            if (!values.content) errors.content = "Don't you want to send your friend a message?"
            return errors
          }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <InputGroup size="md">
                <Field name="content">
                  {({ input, meta }) => {
                    return (
                      <Stack>
                        <Textarea
                          overflowY="scroll"
                          {...input}
                          style={{ overflow: "auto" }}
                          placeholder="Pleas type your message her"
                        />
                        {meta.error && meta.touched && (
                          <Text fontSize="sm" textColor="red">
                            {meta.error}
                          </Text>
                        )}
                      </Stack>
                    )
                  }}
                </Field>
                <InputRightElement>
                  <IconButton
                    aria-label="submit"
                    type="submit"
                    disabled={submitting}
                    icon={<ArrowRightIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          )}
        />
      </Flex>
    </Layout>
  )
}
