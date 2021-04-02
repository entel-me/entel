import { Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react"
import { useMutation } from "blitz"
import Layout from "../components/layout"
import createList from "../mutations/createList"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { useRouter, BlitzPage } from "blitz"

export default function createLists() {
  const [createListMutation] = useMutation(createList)
  const router = useRouter()

  return (
    <Layout>
      <Flex alignContent="center" direction="column" width="full">
        <Heading as="h2" fontSize="3xl" textAlign="center" marginY="0.5rem">
          Create New List
        </Heading>

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
      </Flex>
    </Layout>
  )
}
