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
  useDisclosure,
} from "@chakra-ui/react"
import { useMutation } from "blitz"
import { useRouter, BlitzPage } from "blitz"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Form, Field } from "react-final-form"
import addItem from "../mutations/addItem"
import updateStoreComment from "../mutations/updateStoreComment"
import removeAllItems from "../mutations/removeAllItems"

export default function EditLists({ getList }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [addItemMutation] = useMutation(addItem)
  const [updateStoreCommentMutation] = useMutation(updateStoreComment)
  const [removeAllItemsMutation] = useMutation(removeAllItems)

  const [countItems, setCountItems] = useState(getList!.items.length)
  const [idList, setIdList] = useState(Array.from(Array(countItems).keys()))

  let defaultValues = { store: getList.store, specialWish: getList.comment }
  Array.from(Array(getList.items.length).keys()).forEach((id) => {
    defaultValues["item" + id] = getList.items[id]
  })

  return (
    <>
      <IconButton
        aria-label="Edit List"
        icon={<EditIcon />}
        onClick={() => {
          setCountItems(getList!.items.length)
          setIdList(Array.from(Array(getList!.items.length).keys()))
          onOpen()
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List</ModalHeader>
          <ModalCloseButton />
          <Form
            initialValues={defaultValues}
            onSubmit={async (values) => {
              try {
                await updateStoreCommentMutation({
                  id: getList.id,
                  store: !values.store ? "Unspecified" : values.store,
                  comment: !values.specialWish ? "No special wishes given" : values.specialWish,
                })

                await removeAllItemsMutation({
                  id: getList.id,
                })

                const promises = idList.map(async (value) => {
                  await addItemMutation({
                    listId: getList.id,
                    itemName: values["item" + value],
                  })
                })

                for await (let _ of promises) {
                }

                onClose()
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
            render={({ handleSubmit, submitting }) => (
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
                                isRound={true}
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
                      setIdList(idList.concat(countItems))
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
                    save changes
                  </Button>
                  <Button
                    marginLeft="0.2rem"
                    variant="outline"
                    colorScheme="yellow"
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </form>
            )}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
