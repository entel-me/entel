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
  createStandaloneToast,
} from "@chakra-ui/react"
import { useMutation } from "blitz"
import { useRouter, BlitzPage } from "blitz"
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Form, Field } from "react-final-form"
import addItem from "../mutations/addItem"
import updateStoreComment from "../mutations/updateStoreComment"
import removeAllItems from "../mutations/removeAllItems"
import { appLogger as log } from "app/lib/logger"

export default function EditLists({ getList }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [addItemMutation] = useMutation(addItem)
  const [updateStoreCommentMutation] = useMutation(updateStoreComment)
  const [removeAllItemsMutation] = useMutation(removeAllItems)

  const [countItems, setCountItems] = useState(getList!.items.length)
  const [idList, setIdList] = useState(Array.from(Array(countItems).keys()))

  const toast = createStandaloneToast()

  let defaultValues = { store: getList.store, specialWish: getList.comment }
  Array.from(Array(getList.items.length).keys()).forEach((id) => {
    defaultValues["item" + id] = getList.items[id]
  })

  useEffect(() => {
    try {
      document.getElementById("item" + (countItems - 1))!.focus()
    } catch {}
  }, [countItems])

  return (
    <>
      <IconButton
        icon={<EditIcon />}
        size="xs"
        variant="brand-ghost"
        aria-label="Edit List"
        onClick={() => {
          setCountItems(getList!.items.length)
          setIdList(Array.from(Array(getList!.items.length).keys()))
          onOpen()
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit list</ModalHeader>
          <ModalCloseButton />
          <Form
            initialValues={defaultValues}
            onSubmit={async (values) => {
              try {
                const promisesClean = [
                  await updateStoreCommentMutation({
                    id: getList.id,
                    store: !values.store ? "Unspecified" : values.store,
                    comment: values.specialWish ? values.specialWish : "",
                  }),

                  await removeAllItemsMutation({
                    id: getList.id,
                  }),
                ]
                await Promise.all(promisesClean)

                const promisesAdd = idList.map(async (value) => {
                  await addItemMutation({
                    listId: getList.id,
                    itemName: values["item" + value],
                  })
                })
                await Promise.all(promisesAdd)

                onClose()
                log.info("A shoppinglist was edited successfully.")

                toast({
                  title: "Successfully Edited List",
                  description: "Your changes have been saved to your list",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              } catch (error) {
                log.error("Editing a shoppinglist failed, because of an unexpected error.", {
                  error: error,
                })
              }
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
                            <Input
                              id={"item" + id}
                              margin="0.2rem"
                              {...input}
                              type="text"
                              placeholder="Item"
                            />
                            {idList.length != 1 && (
                              <IconButton
                                variant="brand"
                                borderWidth="1px"
                                borderRadius="5px"
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

                  <Flex flex="1" justifyContent="center">
                    <IconButton
                      icon={<AddIcon />}
                      aria-label="add"
                      variant="brand"
                      borderRadius="20px"
                      width="5rem"
                      margin="0.2rem"
                      onClick={() => {
                        setIdList(idList.concat(countItems))
                        setCountItems(countItems + 1)
                      }}
                    />
                  </Flex>
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
                  <Button type="submit" variant="brand" disabled={submitting}>
                    Save changes
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
    </>
  )
}
