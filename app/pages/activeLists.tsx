import { Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { Head, useQuery } from "blitz"
import getPosition from "../core/queries/getPositionOfUser"
import getActiveLists from "../lists/queries/getActiveLists"
import AcceptedList from "../lists/components/acceptedList"
import { getDistanceByHaversine } from "../lib/position"

export default function ActiveLists() {
  const [activeList, activeListsExtras] = useQuery(getActiveLists, null, { refetchInterval: 2000 })
  const [{ user_latitude, user_longitude }] = useQuery(getPosition, null)
  return (
    <>
      <Head>
        <title>entel | Active lists</title>
      </Head>
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
                    refetch={activeListsExtras.refetch}
                  />
                </WrapItem>
              )
            })
          ) : (
            <Text>Here, you can see the lists accepted by you.</Text>
          )}
        </Wrap>
      </Flex>
    </>
  )
}

ActiveLists.authenticate = { redirectTo: "/" }
