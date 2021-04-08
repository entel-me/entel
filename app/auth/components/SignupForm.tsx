import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Heading, Flex, Button, useDisclosure } from "@chakra-ui/react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" alignContent="center">
      <Button onClick={onOpen} padding="1rem" borderWidth="0.1rem" borderRadius="md" width="6rem">
        Signup
      </Button>
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
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
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
