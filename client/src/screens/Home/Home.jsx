import "./Home.css"
import { useEffect, useState } from "react"
import { getJobs } from "../../services/jobs"
import Layout from "../../components/Layout/Layout";
import axios from "axios"

export default function Home({user, setUser}) {
  const [jobs, setJobs] = useState([])
  const [userLocation, setUserLocation] = useState({})
  const [jobDescription, setJobDescription] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [style, setStyle] = useState({
    visibility: "hidden"
  })

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
      setUserLocation({
        country: userLocation.data.address.country,
        state: userLocation.data.address.state,
        county: userLocation.data.address.county,
        city: userLocation.data.address.city,
        postcode: userLocation.data.address.postcode
      })
      const resp = await getJobs()
      setDescriptionText('Description:')
      setJobs(resp)
      setStyle({
        visibility: "visible"
      })
    }
  }, [])
  
  return (
    <Layout location={userLocation} user={user} setUser={setUser}>
    <div className="home-flex-container">
      <div className="job-title">
              {jobs.map((job) => (
                <div className="card" onClick={()=> setJobDescription(job)}>
                  <h2 className="title">{job.title}</h2>
                  <h4 className="pay">${job.pay}</h4>
                  <hr width="90%"/>
                </div>
              ))}
        </div>
        <div className="job-details-div">
            {jobDescription ? 
            <><h1>{jobDescription.title}</h1><h4>${jobDescription.pay}</h4></>
              :
              <><h1>{jobs[0] && jobs[0].title}</h1><h4>${jobs[0] && jobs[0].pay}</h4></>
          }
          <hr />
          <div className="description-div">
            {jobDescription.user}
          <h2>{descriptionText}</h2>
          <p>{jobDescription ? jobDescription.description : jobs[0] && jobs[0].description}</p>
          </div>
          <button style={style}>Message</button>
          </div>
      </div>
    </Layout>
  )
}
