import {
  Flex,
  ModalOverlay,
  ModalContent,
  FormControl,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  HStack,
  IconButton,
  Text,
  Button,
  Input,
  Modal,
  FormLabel,
} from "@chakra-ui/react"
import { useMutation } from "blitz"
import createList from "../mutations/createList"
import { useRouter, BlitzPage } from "blitz"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Form, Field } from "react-final-form"

export default function CreateLists({ isOpen, onClose }) {
  const [createListMutation] = useMutation(createList)
  const router = useRouter()
  const [countItems, setCountItems] = useState(1)
  const [idList, setIdList] = useState([0])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setIdList([0])
        setCountItems(1)
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new List</ModalHeader>
        <ModalCloseButton />
        <Form
          onSubmit={async (values) => {
            try {
              if (values.store == "" && values.specialWish == "") {
                await createListMutation({
                  store: "Unspecified",
                  specialWish: "No special wishes given",
                })
                router.push("/")
              } else if (values.store == "") {
                await createListMutation({ store: "Unspecified", specialWish: values.specialWish })
                router.push("/")
              } else if (values.specialWish == "") {
                await createListMutation({
                  store: values.store,
                  specialWish: "No special wishes given",
                })
                router.push("/")
              } else {
                await createListMutation(values)
                router.push("/")
              }
            } catch (error) {}
          }}
          validate={(values) => {
            const errors = {}
            for (let i = 0; i < idList.length; i++) {
              const id = idList[i]
              if (!values["item" + id]) errors["item" + id] = "Required"
            }
            return errors
          }}
          render={({ submitError, handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Field name="store">
                  {({ input, meta }) => (
                    <FormControl isInvalid={meta.error && meta.touched}>
                      <FormLabel>Store</FormLabel>
                      <Input
                        margin="0.2rem"
                        {...input}
                        type="text"
                        placeholder="Type in your store if wanted"
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Text>Items</Text>
                {idList.map((id) => (
                  <Field name={"item" + id}>
                    {({ input, meta }) => (
                      <FormControl isInvalid={meta.error && meta.touched}>
                        <HStack justifyContent="space-between">
                          <Input margin="0.2rem" {...input} type="text" placeholder="Item" />
                          {idList.length != 1 && (
                            <IconButton
                              isRound="true"
                              aria-label="Delete Icon"
                              icon={<DeleteIcon />}
                              onClick={() => setIdList(idList.filter((item) => id != item))}
                            />
                          )}
                        </HStack>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                ))}
                <Button
                  margin="0.2rem"
                  onClick={() => {
                    setIdList(idList.concat([countItems]))
                    setCountItems(countItems + 1)
                  }}
                >
                  add item
                </Button>
                <Field name="specialWish">
                  {({ input, meta }) => (
                    <FormControl isInvalid={meta.error && meta.touched}>
                      <FormLabel>Specialwish</FormLabel>
                      <Input
                        margin="0.2rem"
                        {...input}
                        type="text"
                        placeholder="Type in your special wish if wanted"
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" disabled={submitting}>
                  create list
                </Button>
                <Button
                  marginLeft="0.2rem"
                  variant="outline"
                  colorScheme="yellow"
                  mr={3}
                  onClick={() => {
                    onClose()
                    setIdList([0])
                    setCountItems(1)
                  }}
                >
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

/*
<Form
          submitText="CreateList"
          initialValues={{ store: "", specialWish: "" }}
          onSubmit={async (values) => {
            if (values.store == "" && values.specialWish == "") {
              await createListMutation({
                store: "Unspecified",
                specialWish: "No special wishes given",
              })
              router.push("/")
            } else if (values.store == "") {
              await createListMutation({ store: "Unspecified", specialWish: values.specialWish })
              router.push("/")
            } else if (values.specialWish == "") {
              await createListMutation({
                store: values.store,
                specialWish: "No special wishes given",
              })
              router.push("/")
            } else {
              await createListMutation(values)
              router.push("/")
            }
          }}
        >
          <LabeledTextField name="store" label="Store" placeholder="required" />
          <LabeledTextField name="specialWish" label="Special Wishes" placeholder="optional" />
        </Form>
*/
