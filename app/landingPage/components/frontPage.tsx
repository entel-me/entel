import { Flex, Heading, Box, Text, VStack, UnorderedList, ListItem } from "@chakra-ui/react"
import { useMediaQuery } from "react-responsive"
import OwnedList from "./frontPageOwnedList"
import PublicList from "./frontPagePublicList"
import Chat from "./frontPageChat"
import { Image } from "blitz"

export default function FrontPage() {
  const isMobile = useMediaQuery({ query: `(max-width: 850px)` })
  return (
    <>
      <VStack>
        <Flex direction="column" alignItems="center" width="100vw" backgroundColor="brandGreen.800">
          <Image src="/logo_1.png" width={isMobile ? 300 : 500} height={isMobile ? 300 : 500} />
          <Heading
            fontSize={["8rem", "12rem"]}
            lineHeight={["8rem", "10rem"]}
            margin-block-end="0rem"
            fontWeight="extrabold"
            fontFamily="Raleway"
            color="white"
          >
            entel
          </Heading>
          <Text
            fontSize={["1.75rem", "2.75rem"]}
            lineHeight={["4rem", "6rem"]}
            fontWeight="extrabold"
            fontFamily="Raleway"
            color="white"
          >
            Share Your Needs!
          </Text>
        </Flex>
        <Flex direction="column" alignItems="center">
          <Flex
            marginBlockStart="3.5rem"
            marginBlockEnd="3.5rem"
            flexWrap="wrap"
            alignItems="Start"
            justifyContent="center"
          >
            <Box style={{ width: "min(24rem,95vw)" }} alignSelf="baseline" marginBottom="2rem">
              <Heading lineHeight="3rem" marginRight="2rem">
                Share your needs
              </Heading>
              <Text marginRight="2rem">
                Replace the unnecessary walk to the next supermarket by a new shoppinglist in{" "}
                <b>entel</b>.
              </Text>
              <Text marginBlockStart="1rem" marginBlockEnd="0.4rem">
                You can specify:
              </Text>
              <UnorderedList lineHeight="1.15rem">
                <ListItem>Products</ListItem>
                <ListItem>Stores</ListItem>
                <ListItem>Special Wishes</ListItem>
              </UnorderedList>
            </Box>
            <OwnedList
              marketName="Lidl"
              status={1}
              acceptedName="Antony"
              specialWish="as a 'Thank You' you will get a beer on the house"
              itemsList={["wine (sub $5 Pinot Gris)", "sausages", "coffee"]}
            />
          </Flex>
          <Flex
            marginBlockStart="3.5rem"
            marginBlockEnd="3.5rem"
            flexWrap="wrap-reverse"
            alignItems="Start"
            justifyContent="center"
          >
            <PublicList
              marketName="Edeka"
              ownerName="Till"
              distance={750}
              specialWish="Buy only Bio and vegan products please :)"
              itemsList={["Bread", "Jam (Strawberry)", "Agave sirup (from Alnatura)"]}
            />
            <Box style={{ width: "min(24rem,95vw)" }} alignSelf="unset" marginBottom="2rem">
              <Heading textAlign="right" lineHeight="3rem" marginLeft="2rem">
                Help others!
              </Heading>
              <Text textAlign="right" marginLeft="2rem">
                If you are going to the store, help others close to you by accepting their shopping
                list and bring them the products they need!
              </Text>
              <Text textAlign="right" marginLeft="2rem" marginBlockStart="0.4rem">
                Try to close the list, to see how list are represented in our App.
              </Text>
            </Box>
          </Flex>
          <Flex
            marginBlockStart="3.5rem"
            marginBlockEnd="3.5rem"
            flexWrap="wrap"
            alignItems="Start"
            justifyContent="center"
          >
            <Box
              style={{ width: "min(24rem,95vw)" }}
              alignSelf="baseline"
              marginBottom="2rem"
              marginTop="0.5rem"
            >
              <Heading lineHeight="3rem" marginRight="2rem">
                Chat to connect
              </Heading>
              <Text marginRight="2rem">
                Use our integrated text messaging system to connect to your helper. You can specify
                your needs or organize your shopping trip and who knows, maybe you will find new
                friends.{" "}
              </Text>
            </Box>
            <Chat />
          </Flex>
        </Flex>
      </VStack>
    </>
  )
}
