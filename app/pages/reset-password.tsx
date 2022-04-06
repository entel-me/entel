import { BlitzPage, useRouterQuery, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { ResetPasswordForm, FORM_ERROR } from "app/core/components/resetPasswordForm"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import { Heading } from "@chakra-ui/react"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div style={{ alignSelf: "center", width: "min(100vw, 600px)", padding: "0.5rem" }}>
      <Heading
        as="h2"
        fontFamily="Raleway"
        fontWeight="bolder"
        fontSize="4xl"
        textAlign="center"
        alignSelf="center"
        marginY="1rem"
      >
        Set a new password
      </Heading>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href="/">homepage</Link>
          </p>
        </div>
      ) : (
        <ResetPasswordForm
          submitText="Reset Password"
          schema={ResetPassword.omit({ token: true })}
          initialValues={{ password: "", passwordConfirmation: "" }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation({ ...values, token: query.token as string })
            } catch (error) {
              if (error.name === "ResetPasswordError") {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }
          }}
        >
          <LabeledTextField
            name="password"
            label="New Password"
            type="password"
            placeholder="New Password"
          />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
            placeholder="New Password"
          />
        </ResetPasswordForm>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
