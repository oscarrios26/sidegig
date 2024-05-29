import "./Home.css"
import { useEffect, useState } from "react"
import {getJobs} from "../../services/jobs"
import axios from "axios"

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [userLocation, setUserLocation] = useState({})

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      fetchJobs(position.coords.latitude, position.coords.longitude)
    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
      }
}
    getUserLocation()

    const fetchJobs = async (lat, lng) => {
      const userLocation = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${process.env.REACT_APP_LOCATION_API_KEY}`)
      console.log(userLocation)
      setUserLocation({
        country: userLocation.data.address.country,
        state: userLocation.data.address.state,
        county: userLocation.data.address.county,
        city: userLocation.data.address.city,
        postcode: userLocation.data.address.postcode
      })
      const resp = await getJobs()
      setJobs(resp)
    }
  },[])
  return (
    <div>
      {userLocation.city},{userLocation.state}
      {jobs.map((job) => (
        <>
          <h1>{job.title}</h1>
          <h2>{job.description}</h2>
          <h1>{job.pay}</h1>
        </>
      ))}
    </div>
  )
}
