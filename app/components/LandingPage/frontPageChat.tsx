import { ArrowRightIcon } from "@chakra-ui/icons"
import {
  Flex,
  Heading,
  Stack,
  HStack,
  Text,
  Textarea,
  IconButton,
  useToast,
  Box,
} from "@chakra-ui/react"
import AdminMessage from "app/components/chats/adminMessage"
import OwnMessage from "app/components/chats/ownMessage"
import StrangeMessage from "app/components/chats/strangeMessage"
import Layout from "app/components/layout"
import { useQuery, useParam, useMutation } from "blitz"
import { Form, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import { useEffect, useLayoutEffect } from "react"
import { RiMailSendLine } from "react-icons/ri"
import { BiUserCircle } from "react-icons/bi"

export default function Chat() {
  let date1 = new Date(2021, 3, 6, 12, 13)
  let date2 = new Date(2021, 3, 6, 12, 15)
  let date3 = new Date(2021, 3, 6, 12, 16)
  let date4 = new Date(2021, 3, 6, 12, 27)
  let date5 = new Date(2021, 3, 6, 12, 28)
  let date6 = new Date(2021, 3, 6, 13, 43)
  let date7 = new Date(2021, 3, 6, 13, 45)
  let date8 = new Date()

  return (
    <Flex textAlign="center" direction="column" width="sm" maxWidth="600px" alignSelf="center">
      <Heading
        as="h2"
        fontFamily="Raleway"
        fontWeight="bolder"
        fontSize="4xl"
        textAlign="center"
        alignSelf="center"
        marginY="1rem"
      >
        <HStack>
          <BiUserCircle />
          <Text>Philipp</Text>
        </HStack>
      </Heading>
      <Box
        borderRadius="5px"
        borderWidth="2px"
        borderColor="brandSilver.500"
        flex={["1 1 auto", "unset"]}
      >
        <Stack
          id="messages"
          width="full"
          overflowY="auto"
          maxHeight="800px"
          padding="0.5rem"
          borderColor="brandSilver.300"
          borderBottomWidth="2px"
        >
          <AdminMessage
            content="Here you can talk about your most recent accepted/created Shoppinglist. Please be nice!"
            timeStamp={date1}
          />
          <OwnMessage
            content="Hello Philipp, I have accepted your List, anything I need to know before I go shopping?"
            timeStamp={date3}
            userName="Till"
          />
          <StrangeMessage
            content="Hi Till, just be sure to not buy anything above $10"
            timeStamp={date5}
            userName="Philipp"
          />
          <AdminMessage content="The helper bought your item. Hurray!" timeStamp={date6} />
          <StrangeMessage
            content="Hey, thanks a lot. This App is really amazing!!"
            timeStamp={date7}
            userName="Philipp"
          />
          <AdminMessage
            content="Sign Up now and start helping and sharing your needs now!"
            timeStamp={date8}
          />
        </Stack>
        <HStack padding="0.5rem" alignItems="top">
          <Stack flex="1" width="full">
            <Textarea
              resize="none"
              isFullWidth
              _focus={{ boxShadow: "0 0 0 2px #787878" }}
              _hover={{ boxShadow: "0 0 0 2px #787878" }}
              borderWidth="1px"
              borderColor="#787878"
              placeholder="Please type your message in here"
            />
          </Stack>

          <IconButton
            aria-label="submit"
            type="submit"
            variant="brand"
            _disabled={{ _hover: { color: "#787878", cursor: "not-allowed" } }}
            icon={<RiMailSendLine />}
          />
        </HStack>
      </Box>
    </Flex>
  )
}
