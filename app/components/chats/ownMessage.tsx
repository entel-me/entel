import { Stack, Box, Text } from "@chakra-ui/react"

interface StrangeMessageProps {
  content: string
  timeStamp: Date
  userName: string
}
export default function OwnMessage({ content, timeStamp, userName }: StrangeMessageProps) {
  let today = new Date()
  return (
    <Stack spacing="0.1rem" textAlign="right" margin="0.5rem">
      <Box
        padding="0.5rem"
        borderColor="brandGreen.600"
        borderWidth="2px"
        borderTopRadius="17px"
        borderLeftRadius="17px"
        marginLeft="2rem"
      >
        <Text>{content}</Text>
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
