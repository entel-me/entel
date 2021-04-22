import { AuthenticationError, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import verifyMail from "../mutations/verifyMail"
import { SignupReq } from "app/auth/validations"
import { Heading, Flex, Button, useDisclosure, Box } from "@chakra-ui/react"
import { appLogger as log } from "app/lib/logger"

interface SignupFormProps {
  onSuccess?: () => Promise<void>
}
export const SignupForm = (props: SignupFormProps) => {
  const [verifyMailMutaiton] = useMutation(verifyMail)
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
        schema={SignupReq}
        initialValues={{ name: "", email: "", password: "" }}
        modalHeader="Create an Account"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={async (values) => {
          try {
            await verifyMailMutaiton(values)
            await props.onSuccess?.()
            onClose()
            log.info("Sending mail to verify mailaddress was successfull.")
          } catch (error) {
            if (error instanceof AuthenticationError) {
              log.warn("Signup failed, because the email is already being used.")
              return { email: "This email is already being used" }
            } else {
              log.error("Signup failed, because of an unexpected error.", { error: error })
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
