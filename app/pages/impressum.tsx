import { Flex, Heading, Link, Text, Wrap, WrapItem } from "@chakra-ui/react"
import Layout from "../components/layout"
import OwnedList from "../components/ownedList"
import getArchivedLists from "../queries/getArchivedLists"
import { useQuery } from "blitz"
import checkIfUnreadMessage from "app/queries/checkIfUnreadMessages"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

function ImpressumLoggedIn() {
  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 5000 })
  return (
    <Layout hasUnreadMessage={hasUnreadMessage}>
      <ImpressumContent />
    </Layout>
  )
}

function ImpressumLoggedOut() {
  return (
    <Layout user={false}>
      <ImpressumContent />
    </Layout>
  )
}

function ImpressumContent() {
  return (
    <Flex textAlign="left" direction="column" width="full">
      <Heading
        as="h2"
        fontFamily="Raleway"
        fontWeight="bolder"
        fontSize="4xl"
        textAlign="center"
        alignSelf="center"
        marginY="1rem"
      >
        Impressum
      </Heading>
      <Heading as="h3" fontSize="2xl">
        Diensteanbieter
      </Heading>
      <p>Antony Kamp</p>
      <p>Stahnsdorferstraße 142B</p>
      <p>14482 Potsdam</p>
      <p>Germany</p>
      <Heading as="h3" fontSize="2xl" marginTop="1rem">
        Kontaktmöglichkeiten
      </Heading>
      <p>
        E-Mail-Adresse: <Link href="mailto:info@antonykamp.de">info@antonykamp.de</Link>.
      </p>
    </Flex>
  )
}
export default function Impressum() {
  const user = useCurrentUser()
  if (user) return <ImpressumLoggedIn />
  else return <ImpressumLoggedOut />
}
