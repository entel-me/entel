import { Stack, Box, Text } from "@chakra-ui/react"

interface AdminMessageProps {
  content: string
}
export default function AdminMessage({ content }: AdminMessageProps) {
  return (
    <Box
      padding="0.2rem"
      backgroundColor="brandSilver.600"
      borderRadius="10px"
      textAlign="center"
      marginX="1rem"
      marginY="0.1rem"
    >
      <Text color="white">{content}</Text>
    </Box>
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
