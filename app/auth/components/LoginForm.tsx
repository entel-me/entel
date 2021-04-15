import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Flex, Heading, Button, useDisclosure, Box } from "@chakra-ui/react"
import ForgotPasswordPage from "app/auth/components/forgot-password"
import { appLogger as log } from "app/lib/logger"

type LoginFormProps = {
  onSuccess?: () => Promise<void> | void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" alignContent="center">
      <Box
        as="button"
        textTransform="uppercase"
        fontFamily="Raleway"
        fontWeight="semibold"
        paddingX="0.4rem"
        fontSize="lg"
        borderBottomWidth="0.3rem"
        borderBottomColor="brandSilver.200"
        _hover={{ borderBottomColor: "brandSilver.500" }}
        onClick={onOpen}
      >
        Login
      </Box>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        modalHeader="Login to your Account"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            await props.onSuccess?.()
            log.info("Login was successfull.")
          } catch (error) {
            if (error instanceof AuthenticationError) {
              log.warn("Login failed, because of invalid credentials.")
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              log.error("Login failed, because of an unexpected error.", { error: error })
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <ForgotPasswordPage />
        </div>
      </Form>
    </Flex>
  )
}

export default LoginForm
