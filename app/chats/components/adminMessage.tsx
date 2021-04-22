import { Stack, Box, Text } from "@chakra-ui/react"

interface AdminMessageProps {
  content: string
  timeStamp: Date
}
export default function AdminMessage({ content, timeStamp }: AdminMessageProps) {
  let today = new Date()
  return (
    <Stack margin="0.5rem">
      <Box
        padding="0.2rem"
        backgroundColor="brandSilver.600"
        borderRadius="10px"
        textAlign="center"
        marginX="1rem"
      >
        <Text color="white">{content}</Text>
      </Box>
      {timeStamp.toDateString() == today.toDateString() ? (
        <Text fontSize="sm">
          {timeStamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
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
