import { Stack, HStack, Text } from "@chakra-ui/react"
import { useQuery } from "blitz"
import { useRouter } from "blitz"
import { InfoIcon } from "@chakra-ui/icons"
import { Message } from "app/queries/getChatsWithLastMessage"

interface ChatPreviewProps {
  chatId: number
  userName: string
  lastMessage: Message
}
export default function ChatPreview({ chatId, userName, lastMessage }: ChatPreviewProps) {
  const router = useRouter()
  return (
    <Stack
      spacing="0.1rem"
      textAlign="left"
      margin="0.5rem"
      borderWidth="2px"
      borderRadius="5px"
      borderColor="brandSilver.200"
      padding="0.5rem"
      onClick={() => router.push("/chats/[chatId]", "chats/" + chatId)}
      _hover={{ cursor: "pointer", borderColor: "brandSilver.500" }}
    >
      <Text fontSize="2xl" fontWeight="semibold" textColor="brandChestnut.800">
        {userName}
      </Text>
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
      <Text fontSize="sm">{lastMessage && lastMessage.sentAt.toDateString()}</Text>
    </Stack>
  )
}
