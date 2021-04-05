import { Stack, Box, Text } from "@chakra-ui/react"

interface StrangeMessageProps {
  content: string
  timeStamp: Date
  userName: string
}
export default function StrangeMessage({ content, timeStamp, userName }: StrangeMessageProps) {
  return (
    <Stack spacing="0.1rem" textAlign="left" margin="0.5rem" marginRight="2rem">
      <Box
        padding="0.5rem"
        backgroundColor="green.100"
        borderTopRadius="10px"
        borderRightRadius="10px"
      >
        <Text>{content}</Text>
      </Box>
      <Text fontSize="sm">{timeStamp.toDateString()}</Text>
    </Stack>
  )
}
