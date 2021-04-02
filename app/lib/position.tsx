import { useToast } from "@chakra-ui/react"
import updatePosition from "app/mutations/updatePoisition"
import { useMutation, useQuery } from "blitz"
import { useEffect, useState } from "react"

export function useCurrentPosition() {
  const [updatePositionMutation] = useMutation(updatePosition)
  const toast = useToast()

  useEffect(() => {
    const positionResult = getCurrentPosition()
    positionResult
      .then(({ latitude, longitude }) => {
        updatePositionMutation({ new_latitude: latitude, new_longitude: longitude })
      })
      .catch((error) => {
        toast({
          title: "Couldn't access your position",
          description:
            "Farmers' Market couldn't access your position. Some features will be limited.",
          status: "error",
          duration: 8000,
          isClosable: true,
        })
      })
  }, [])
}

function getCurrentPosition() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        resolve({ latitude, longitude })
      },
      (error) => reject(error)
    )
  )
}

export function getDistanceByHaversine(lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
