import { Stack, Box, Text } from "@chakra-ui/react"

interface StrangeMessageProps {
  content: string
  timeStamp: Date
  userName: string
}
export default function StrangeMessage({ content, timeStamp, userName }: StrangeMessageProps) {
  let today = new Date()
  return (
    <Stack spacing="0.1rem" textAlign="left" margin="0.5rem">
      <Box
        padding="0.5rem"
        backgroundColor="brandGreen.600"
        borderTopRadius="10px"
        borderRightRadius="10px"
        marginRight="2rem"
      >
        <Text color="white">{content}</Text>
      </Box>
      {timeStamp.toDateString() == today.toDateString() ? (
        <Text fontSize="sm">{timeStamp.toLocaleTimeString([], { timeStyle: "short" })}</Text>
      ) : (
        <Text fontSize="sm">
          {timeStamp.toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </Stack>
  )
}
