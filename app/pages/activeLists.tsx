import { Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react"
import { useQuery } from "blitz"
import Layout from "../components/layout"
import getPosition from "../queries/getPositionOfUser"
import getActiveLists from "../queries/getActiveLists"
import AcceptedList from "../components/acceptedList"

function pythagoras(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

export default function ActiveLists() {
  const [activeList, activeListsExtras] = useQuery(getActiveLists, null, { refetchInterval: 2000 })
  const [position] = useQuery(getPosition, null, { refetchInterval: 2000 })
  const activeListsRefetch = activeListsExtras.refetch

  return (
    <Layout>
      <Flex textAlign="left" direction="column" width="full">
        <Heading as="h2" fontSize="3xl" textAlign="center" marginY="0.5rem">
          My accepted lists
        </Heading>
        <Wrap justify="center">
          {activeList.map((YourList) => {
            return (
              <WrapItem>
                <AcceptedList
                  marketName={YourList.store}
                  itemsList={YourList.items.map((itemsList) => {
                    return itemsList.name
                  })}
                  distance={Math.ceil(
                    pythagoras(
                      position.user_x,
                      position.user_y,
                      YourList.createdBy.position_x,
                      YourList.createdBy.position_y
                    )
                  )}
                  ownerName={YourList.createdBy!.name!}
                  specialWish={YourList.comment}
                  listId={YourList.id}
                  refetch={activeListsRefetch}
                />
              </WrapItem>
            )
          })}
        </Wrap>
      </Flex>
    </Layout>
  )
}
