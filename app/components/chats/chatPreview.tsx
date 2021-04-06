import { Stack, HStack, Text } from "@chakra-ui/react"
import getLastMessage from "../../queries/getLastMessage"
import { useQuery } from "blitz"
import { useRouter } from "blitz"

interface ChatPreviewProps {
  chatId: number
  userName: string
}
export default function ChatPreview({ chatId, userName }: ChatPreviewProps) {
  const [lastMessage] = useQuery(getLastMessage, { chatId })
  const router = useRouter()
  return (
    <Stack
      spacing="0.1rem"
      textAlign="left"
      margin="0.5rem"
      marginRight="2rem"
      borderWidth="2px"
      borderRadius="5px"
      padding="0.5rem"
      onClick={() => router.push("/chats/[chatId]", "chats/" + chatId)}
      _hover={{ cursor: "pointer", borderColor: "gray.500" }}
    >
      <Text fontSize="2xl" fontWeight="semibold">
        {userName}
      </Text>
      {lastMessage && (
        <HStack>
          <Text fontWeight="semibold">
            {lastMessage.sentFrom && lastMessage.sentFrom.name + ": "}
          </Text>
          <Text textColor="gray.600" isTruncated>
            {lastMessage.content}
          </Text>
        </HStack>
      )}
      <Text fontSize="sm">{lastMessage && lastMessage.sentAt.toLocaleString()}</Text>
    </Stack>
  )
}
