import { Stack, Box, Text } from "@chakra-ui/react"

interface StrangeMessageProps {
  content: string
  timeStamp: Date
  userName: string
}
export default function OwnMessage({ content, timeStamp, userName }: StrangeMessageProps) {
  return (
    <Stack spacing="0.1rem" textAlign="right" margin="0.5rem" marginLeft="2rem">
      <Box
        padding="0.5rem"
        borderColor="green.200"
        borderWidth="2px"
        borderTopRadius="17px"
        borderLeftRadius="17px"
      >
        <Text>{content}</Text>
      </Box>
      <Text fontSize="sm">{timeStamp.toDateString()}</Text>
    </Stack>
  )
}

/*
    
        <Stack>
            <StackItem>
                
                <Avatar name={userName} />
                <Box textAlign="left" borderTopRadius="10px" borderRightRadius="10px">
                    {content}
                </Box>
            </StackItem>
        </Stack>
        */
