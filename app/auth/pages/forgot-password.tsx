import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { Flex, Button, useDisclosure } from "@chakra-ui/react"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <Flex
          direction="column"
          alignItems="left"
          justifyContent="center"
          alignContent="center"
          margin="1rem"
        >
          <Button onClick={onOpen} borderWidth="0.1rem" borderRadius="md" align="left">
            Forgot Password
          </Button>
          <Form
            submitText="Send Reset Password Instructions"
            schema={ForgotPassword}
            onClose={onClose}
            isOpen={isOpen}
            modalHeader="Forgot your password?"
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await forgotPasswordMutation(values)
              } catch (error) {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" />
          </Form>
        </Flex>
      )}
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
