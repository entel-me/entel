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
import { useRouter, BlitzPage } from "blitz"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Form, Field } from "react-final-form"
import addItem from "../mutations/addItem"
import getShoppinglist from "../queries/getShoppinglist"
import createList from "../mutations/createList"
import { useQuery } from "blitz"
import removeShoppinglist from "../mutations/removeShoppinglist"

export default function EditLists({ isOpen, onClose, listId }) {
  const [createListMutation, { data }] = useMutation(createList)
  const [addItemMutation] = useMutation(addItem)
  const [removeShoppinglistMutation] = useMutation(removeShoppinglist)
  const [getList] = useQuery(getShoppinglist, { id: listId })
  const router = useRouter()

  const [countItems, setCountItems] = useState(getList!.items.length)
  const [idList, setIdList] = useState(Array.from(Array(countItems).keys()))

  let defaultValues = { store: getList.store, comment: getList.comment }
  Array.from(Array(countItems).keys()).forEach((id) => {
    console.log(getList)
    console.log(id)
    defaultValues["item" + id] = getList.items[id].name
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit List</ModalHeader>
        <ModalCloseButton />
        <Form
          initialValues={defaultValues}
          onSubmit={async (values) => {
            try {
              const test = await createListMutation({
                store: !values.store ? "Unspecified" : values.store,
                specialWish: !values.specialWish ? "No special wishes given" : values.specialWish,
              })

              idList.forEach(function (value) {
                addItemMutation({
                  listId: test.id,
                  itemName: values["item" + value],
                })
              })
              await removeShoppinglistMutation({ id: listId })
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
                <Button type="submit" disabled={submitting} onClick={onClose}>
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
  )
}
