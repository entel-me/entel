import { Stack, Skeleton } from "@chakra-ui/react"
export default function LoadingPage() {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  )
}
