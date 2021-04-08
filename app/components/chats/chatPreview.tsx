import { Stack, HStack, Text, Circle } from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"
import { Message } from "app/queries/getChatsWithLastMessage"
import { Link as BlitzLink } from "blitz"

interface ChatPreviewProps {
  chatId: number
  userName: string
  lastMessage: Message
  unreadMessagesCnt: number
}
export default function ChatPreview({
  chatId,
  userName,
  lastMessage,
  unreadMessagesCnt,
}: ChatPreviewProps) {
  let today = new Date()
  return (
    <BlitzLink href={"/chats/" + chatId}>
      <Stack
        spacing="0.1rem"
        textAlign="left"
        margin="0.5rem"
        borderWidth="2px"
        borderRadius="5px"
        borderColor="brandSilver.200"
        padding="0.5rem"
        _hover={{ cursor: "pointer", borderColor: "brandSilver.500" }}
      >
        <HStack>
          <Text fontSize="2xl" fontWeight="semibold" textColor="brandChestnut.800">
            {userName}
          </Text>
          {unreadMessagesCnt != 0 && (
            <Circle size="1.5rem" fontSize="1rem" bg="brandGreen.500" color="white">
              {unreadMessagesCnt}
            </Circle>
          )}
        </HStack>
        {lastMessage && (
          <HStack>
            {lastMessage.sentFrom ? (
              <Text fontWeight="semibold">{lastMessage.sentFrom.name + ": "}</Text>
            ) : (
              <InfoIcon color="brandSilver.800" />
            )}
            <Text textColor="brandSilver.800" isTruncated as="i">
              {lastMessage.content}
            </Text>
          </HStack>
        )}
        {lastMessage!.sentAt.toDateString() == today.toDateString() ? (
          <Text fontSize="sm">
            {lastMessage &&
              lastMessage.sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        ) : (
          <Text fontSize="sm">{lastMessage && lastMessage.sentAt.toLocaleDateString()}</Text>
        )}
      </Stack>
    </BlitzLink>
  )
}
