import {
  Button,
  useDisclosure,
  CloseButton,
  HStack,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react"
import { useMutation } from "blitz"
import { appLogger as log } from "app/lib/logger"

import removeShoppinglist from "../mutations/removeShoppinglist"

const RemoveList = ({ listId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [removeShoppinglistMutation] = useMutation(removeShoppinglist)
  const toast = useToast()
  return (
    <>
      <CloseButton
        onClick={onOpen}
        isRound="true"
        size="sm"
        _hover={{ backgroundColor: "brandGreen.500", color: "white" }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>"Confirmation"</ModalHeader>
          <ModalCloseButton />
          <ModalBody>"Are you sure you want to delete this Shoppinglist permanently?"</ModalBody>

          <ModalFooter>
            <HStack>
              <Button
                variant="brand"
                mr={3}
                onClick={async () => {
                  onClose()
                  await removeShoppinglistMutation({ id: listId })
                  log.info("A shoppinglist was deleted permanently.")

                  toast({
                    title: "Successfully Deleted List",
                    description: "This list is permanently deleted from your records",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }}
              >
                Delete List
              </Button>
              <Button variant="brand-close" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveList
