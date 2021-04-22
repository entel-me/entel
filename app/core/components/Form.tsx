import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  modalHeader: string
  isOpen: boolean
  onClose: () => void
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  modalHeader,
  isOpen,
  onClose,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <FinalForm
          initialValues={initialValues}
          validate={(values) => {
            if (!schema) return
            try {
              schema.parse(values)
            } catch (error) {
              return error.formErrors.fieldErrors
            }
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit} {...props}>
              {/* Form fields supplied as children are rendered here */}
              <ModalBody>
                {children}
                {submitError && (
                  <div role="alert" style={{ color: "red" }}>
                    {submitError}
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                {submitText && (
                  <Button type="submit" variant="brand" disabled={submitting}>
                    {submitText}
                  </Button>
                )}
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

export default Form
