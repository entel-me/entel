import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Heading, Flex, Button, useDisclosure, Box } from "@chakra-ui/react"
import { appLogger as log } from "app/lib/logger"

interface SignupFormProps {
  onSuccess?: () => Promise<void>
}
export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
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
        Signup
      </Box>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ name: "", email: "", password: "" }}
        modalHeader="Create an Account"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            await props.onSuccess?.()
            log.info("Sign up was successfull.")
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              log.warn("Login failed, because the email is already being used.")
              return { email: "This email is already being used" }
            } else {
              log.error("Login failed, because of an unexpected error.", { error: error })
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Username" placeholder="Username" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </Flex>
  )
}

export default SignupForm
