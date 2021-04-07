import { Stack, HStack, Text } from "@chakra-ui/react"
import getLastMessage from "../../queries/getLastMessage"
import { useQuery } from "blitz"
import { useRouter } from "blitz"
import { InfoIcon } from "@chakra-ui/icons"
import { convertTransitionToAnimationOptions } from "framer-motion/types/animation/utils/transitions"

interface ChatPreviewProps {
  chatId: number
  userName: string
}
export default function ChatPreview({ chatId, userName }: ChatPreviewProps) {
  const [lastMessage] = useQuery(getLastMessage, { chatId })
  const router = useRouter()
  let today = new Date()
  return (
    <Stack
      spacing="0.1rem"
      textAlign="left"
      margin="0.5rem"
      marginRight="2rem"
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
      {lastMessage!.sentAt.toDateString() == today.toDateString() ? (
        <Text fontSize="sm">
          {lastMessage && lastMessage.sentAt.toLocaleTimeString([], { timeStyle: "short" })}
        </Text>
      ) : (
        <Text fontSize="sm">{lastMessage && lastMessage.sentAt.toLocaleDateString()}</Text>
      )}
    </Stack>
  )
}
