import { Box, Text } from "@chakra-ui/react"

export default function BrandBadge({ status }) {
  let fontColor, bgColor, statusText
  if (status == 0) {
    fontColor = "gray.800"
    bgColor = "brandSilver.100"
    statusText = "pending"
  } else if (status == 1) {
    fontColor = "brandGreen.800"
    bgColor = "brandGreen.200"
    statusText = "accepted"
  } else {
    fontColor = "brandChestnut.800"
    bgColor = "brandChestnut.200"
    statusText = "archived"
  }
  return (
    <Box
      backgroundColor={bgColor}
      borderColor={fontColor}
      paddingY="0.1rem"
      paddingX="0.25rem"
      borderRadius="0.2rem"
      height="1.3rem"
      lineHeight="1.1rem"
    >
      <Text fontWeight="bold" fontSize="0.75rem" textColor={fontColor} textTransform="uppercase">
        {statusText}
      </Text>
    </Box>
  )
}
