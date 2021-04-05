import { Stack, Box, Text } from "@chakra-ui/react"

interface ChatPreviewProps {
  content: string
  timeStamp: Date
  userName: string
}
export default function ChatPreview({ content, timeStamp, userName }: ChatPreviewProps) {
  return (
    <Stack
      spacing="0.1rem"
      textAlign="left"
      margin="0.5rem"
      marginRight="2rem"
      borderWidth="2px"
      borderRadius="5px"
      padding="0.5rem"
    >
      <Text fontSize="2xl" fontWeight="semibold">
        {userName}
      </Text>
      <Text textColor="gray.600" isTruncated>
        {content}
      </Text>
      <Text fontSize="sm">{timeStamp.toDateString()}</Text>
    </Stack>
  )
}
