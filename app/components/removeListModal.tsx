import {
  Button,
  useDisclosure,
  IconButton,
  CloseButton,
  HStack,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { useMutation } from "blitz"
import removeShoppinglist from "../mutations/removeShoppinglist"

const RemoveList = ({ modalHeader, modalBody, modalFooter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [removeShoppinglistMutation] = useMutation(removeShoppinglist)
  return (
    <>
      <CloseButton
        onClick={onOpen}
        isRound="true"
        size="sm"
        _hover={{ backgroundColor: "red", color: "white" }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <HStack>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  onClose()
                  removeShoppinglistMutation({ id: modalFooter })
                }}
              >
                Delete List
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveList
