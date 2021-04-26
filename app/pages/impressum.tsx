import { Flex, Heading, Link } from "@chakra-ui/react"

export default function Impressum() {
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
