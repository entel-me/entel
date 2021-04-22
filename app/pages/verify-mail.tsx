import { BlitzPage, useRouterQuery, useMutation, useQuery, Head } from "blitz"
import signup from "app/auth/queries/signup"
import { Flex, Heading, Text } from "@chakra-ui/react"
import Loading from "app/core/components/loading"
import { useEffect } from "react"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [signupQuery] = useQuery(signup, { token: query.token as string })

  return (
    <>
      <Head>
        <title>entel | Verify Mail</title>
      </Head>

      <Flex direction="column" width="full" textAlign="center">
        {signupQuery ? (
          <>
            <Heading
              as="h2"
              fontFamily="Raleway"
              fontWeight="bolder"
              fontSize="4xl"
              alignSelf="center"
              marginY="1rem"
            >
              Congratulations!
            </Heading>
            <Text>You have successfully created your account with entel.</Text>
            <Text>Log in to create your first shopping list.</Text>
          </>
        ) : (
          <>
            <Heading
              as="h2"
              fontFamily="Raleway"
              fontWeight="bolder"
              fontSize="4xl"
              alignSelf="center"
              marginY="1rem"
            >
              Sorry!
            </Heading>
            <Text>Something went wrong.</Text>
            <Text>This token doesn't exists.</Text>
          </>
        )}
      </Flex>
    </>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
