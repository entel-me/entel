import {
  useToast,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"

import { AuthenticationError, Head, useMutation } from "blitz"
import changePassword from "app/auth/mutations/changePassword"
import { Form, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import * as z from "zod"

export function ChangePassword({ isOpen, onClose }) {
  const [changePasswordMutation] = useMutation(changePassword)
  const toast = useToast()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <Form
          onSubmit={async (values) => {
            try {
              await changePasswordMutation({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
              })
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                toast({
                  title: "Sorry",
                  description: "Something went wrong. Please try again.",
                  status: "error",
                  duration: 8000,
                  isClosable: true,
                })
                return {
                  [FORM_ERROR]: "Something went wrong.",
                }
              }
            }
          }}
          validate={(values) => {
            const errors = {}

            if (!z.string().min(10).max(100).check(values.newPassword))
              errors.newPassword = "You password should have more than 10 charakters."
            else if (values.newPassword !== values.newPasswordRepeat)
              errors.newPasswordRepeat = "The passwords doesn't match."
            console.log(errors)
            return errors
          }}
          render={({ submitError, handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody id="body">
                <Field name="currentPassword">
                  {({ input, meta }) => (
                    <FormControl isRequired isInvalid={submitError}>
                      <FormLabel>Old Password</FormLabel>
                      <Input {...input} type="password" placeholder="Current password" />
                      <FormErrorMessage>{submitError}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="newPassword">
                  {({ input, meta }) => (
                    <FormControl isRequired isInvalid={meta.error && meta.touched}>
                      <FormLabel>New password</FormLabel>
                      <Input {...input} type="password" placeholder="New password" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="newPasswordRepeat">
                  {({ input, meta }) => (
                    <FormControl isRequired isInvalid={meta.error && meta.touched}>
                      <FormLabel>Repeat new password</FormLabel>
                      <Input {...input} type="password" placeholder="New password" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" variant="brand" disabled={submitting}>
                  ChangePassword
                </Button>
                <Button marginLeft="0.2rem" variant="brand-close" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          )}
        />
      </ModalContent>
    </Modal>
  )
}
