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
  createStandaloneToast,
} from "@chakra-ui/react"
import { useMutation } from "blitz"
import removeShoppinglist from "../mutations/removeShoppinglist"

const RemoveList = ({ modalHeader, modalBody, modalFooter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [removeShoppinglistMutation] = useMutation(removeShoppinglist)
  const toast = createStandaloneToast()
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
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <HStack>
              <Button
                variant="brand"
                mr={3}
                onClick={async () => {
                  onClose()
                  await removeShoppinglistMutation({ id: modalFooter })
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
