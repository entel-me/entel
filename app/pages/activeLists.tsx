import { Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react"
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
        <Heading
          as="h2"
          fontFamily="Raleway"
          fontWeight="bolder"
          fontSize="4xl"
          textAlign="center"
          alignSelf="center"
          marginY="1rem"
        >
          My accepted lists
        </Heading>
        <Wrap justify="center">
          {activeList.length != 0 ? (
            activeList.map((YourList) => {
              return (
                <WrapItem>
                  <AcceptedList
                    marketName={YourList.store}
                    itemsList={YourList.items.map((itemsList) => {
                      return itemsList.name
                    })}
                    distance={Math.floor(
                      getDistanceByHaversine(
                        user_latitude,
                        user_longitude,
                        YourList.createdBy.last_latitude,
                        YourList.createdBy.last_longitude
                      )
                    )}
                    ownerName={YourList.createdBy!.name!}
                    ownerId={YourList.createdBy!.id!}
                    specialWish={YourList.comment}
                    listId={YourList.id}
                    refetch={activeListsRefetch}
                  />
                </WrapItem>
              )
            })
          ) : (
            <Text>Here, you can see the lists accepted by you.</Text>
          )}
        </Wrap>
      </Flex>
    </Layout>
  )
}
