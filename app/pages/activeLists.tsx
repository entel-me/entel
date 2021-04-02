import { Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react"
import { useQuery } from "blitz"
import Layout from "../components/layout"
import getPosition from "../queries/getPositionOfUser"
import getActiveLists from "../queries/getActiveLists"
import AcceptedList from "../components/acceptedList"
import { getDistanceByHaversine } from "../lib/position"

export default function ActiveLists() {
  const [activeList, activeListsExtras] = useQuery(getActiveLists, null, { refetchInterval: 2000 })
  const activeListsRefetch = activeListsExtras.refetch
  const [{ user_latitude, user_longitude }] = useQuery(getPosition, null)

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
                    getDistanceByHaversine(
                      user_latitude,
                      user_longitude,
                      YourList.createdBy.last_latitude,
                      YourList.createdBy.last_longitude
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
