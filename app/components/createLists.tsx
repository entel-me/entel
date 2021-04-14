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
import createList from "../mutations/createList"
import { useRouter, BlitzPage } from "blitz"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Form, Field } from "react-final-form"
import addItem from "../mutations/addItem"
import { Logger } from "tslog"

export default function CreateLists() {
  const [createListMutation] = useMutation(createList)
  const [addItemMutation] = useMutation(addItem)
  const router = useRouter()
  const [countItems, setCountItems] = useState(1)
  const [idList, setIdList] = useState([0])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = createStandaloneToast()
  const log: Logger = new Logger()

  useEffect(() => {
    try {
      document.getElementById("item" + (countItems - 1))!.focus()
    } catch {}
  }, [countItems])

  return (
    <>
      <Button
        variant="brand"
        onClick={onOpen}
        padding="0.4rem"
        marginTop="0.5rem"
        marginBottom="1rem"
        alignSelf="center"
        textAlign="center"
        maxWidth="300px"
        borderRadius="md"
      >
        Create new list
      </Button>
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
          <ModalHeader>Create new list</ModalHeader>
          <ModalCloseButton />
          <Form
            onSubmit={async (values) => {
              try {
                const shoppinglistId = await createListMutation({
                  store: !values.store ? "Unspecified" : values.store,
                  specialWish: values.specialWish ? values.specialWish : "",
                })

                const promises = idList.map(async (value) => {
                  await addItemMutation({
                    listId: shoppinglistId.id,
                    itemName: values["item" + value],
                  })
                })

                await Promise.all(promises)

                setIdList([0])
                setCountItems(1)
                onClose()
                log.info("A new shoppinglist was created successfully.")

                toast({
                  title: "Successfully Created List",
                  description: "You will find your created lists under 'Home'",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              } catch (error) {
                log.error("Creating a new shoppinglist failed, because of an unexpected error.", {
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
                            <Input
                              id={"item" + id}
                              margin="0.2rem"
                              {...input}
                              type="text"
                              placeholder="Item"
                            />
                            {idList.length != 1 && (
                              <IconButton
                                isRequired
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
                        setIdList(idList.concat([countItems]))
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
                    Create list
                  </Button>
                  <Button
                    marginLeft="0.2rem"
                    variant="brand-close"
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
    </>
  )
}
