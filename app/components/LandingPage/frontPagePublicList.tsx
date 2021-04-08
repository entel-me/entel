import {
  Box,
  Heading,
  ListItem,
  Flex,
  Text,
  UnorderedList,
  Collapse,
  useDisclosure,
  Divider,
  Button,
  List,
  HStack,
  createStandaloneToast,
} from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"
import { useMutation, useQuery } from "blitz"
import { useState } from "react"
import { BiShoppingBag, BiUserCircle, BiStore } from "react-icons/bi"

interface PublicListProps {
  distance: Number
  marketName: String
  itemsList: String[]
  ownerName: String
  specialWish?: String
}
export default function PublicList({
  distance,
  marketName,
  itemsList,
  ownerName,
  specialWish,
}: PublicListProps) {
  const { isOpen, onToggle } = useDisclosure()
  const [isHovered, onHover] = useState(false)
  const toast = createStandaloneToast()
  return (
    <Flex
      justifyContent="space-between"
      flexDirection="column"
      borderWidth="2px"
      width="sm"
      borderRadius="lg"
      borderColor="brandGreen.800"
      onClick={onToggle}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      overflow="visible"
      margin="0rem"
      height="min-content"
    >
      <Flex paddingX="1rem" paddingY=".5rem" justifyContent="space-between" flexDirection="row">
        <Box>
          <Heading color="brandGreen.900" fontSize="2xl">
            {Number.isNaN(distance) ? "∞" : distance == 0 ? "<1" : distance} km
          </Heading>
          <HStack>
            <BiUserCircle />
            <Text>{ownerName}</Text>
          </HStack>
        </Box>
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="end"
          wordBreak="break-word"
        >
          <HStack>
            <Text>{itemsList.length} item(s)</Text>
            <BiShoppingBag />
          </HStack>
          <HStack>
            <Text>{marketName}</Text>
            <BiStore />
          </HStack>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Divider height="0.25rem" color="black" />
        <Flex padding="0.5rem" justifyContent="space-between" flexDirection="column">
          <UnorderedList>
            {itemsList.map((item) => {
              return <ListItem>{item}</ListItem>
            })}
          </UnorderedList>
          {specialWish && (
            <Text>
              <InfoIcon color="brandGreen.700" /> {specialWish}
            </Text>
          )}
          <Button
            variant="brand"
            marginTop="0.5rem"
            onClick={async () => {
              toast({
                title: "Login to accept Lists",
                description: "Login or create an account and start accepting Lists",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
            }}
          >
            {" "}
            Accept{" "}
          </Button>
        </Flex>
      </Collapse>
      <Collapse in={isHovered && !isOpen} animateOpacity>
        <Flex
          textAlign="center"
          justifyContent="center"
          _hover={{ background: "brandGreen.600", cursor: "pointer" }}
          backgroundColor="brandGreen.500"
          textColor="white"
          flexDirection="column"
          height="1.5rem"
        >
          <Text fontSize="1rem" fontWeight="semibold">
            show more
          </Text>
        </Flex>
      </Collapse>
    </Flex>
  )
}
