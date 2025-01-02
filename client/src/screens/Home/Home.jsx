import "./Home.css"
import { useEffect, useState } from "react"
import { getJobs } from "../../services/jobs"
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import axios from "axios"
import { verifyUser } from "../../services/users"
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [userLocation, setUserLocation] = useState({})
  const [jobDescription, setJobDescription] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [dateJoined, setDateJoined] = useState('') 

  useEffect(() => {
    if (localStorage.getItem("token")) {
			const fetchUser = async () => {
				const token = JSON.stringify(localStorage.getItem("token"));
        const decoded = jwtDecode(token);
        const resp = await verifyUser(decoded.user_id);
        if (resp) {
          setUser(resp.username)
          let date = new Date(resp.date_joined)
          date = date.toUTCString()
          date = date.slice(7, 16)
          setDateJoined(date)
          setUserId(decoded.user_id);
        }
			};
			fetchUser();
    }
    
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
      resp.sort((a,b)=>{
        return new Date(b.created_at) - new Date(a.created_at);
        });
      setDescriptionText('Description:')
      setJobs(resp)
    }
  }, [])
  
  return (
    <Layout location={userLocation} user={user} setUser={setUser} userId={userId} dateJoined={dateJoined}>
    <div className="home-flex-container">
      <div className="job-title">
              {jobs.map((job) => (
                <div className="card" onClick={() => setJobDescription(job)}>
                  <div className="title">{job.title}</div>
                  <h4 className="pay">${job.pay}</h4>
                  <div className="location-div">
                    <p>{job.city},{job.state}</p>
                    <p className="timestamp">{moment(job.created_at).fromNow()}</p>
                  </div>
                  <hr width="90%"/>
                </div>
              ))}
        </div>
          <div className="job-details-div">
          {jobDescription ?
            <>
              <div className="div-details">
              <p className="p-title">{jobDescription.title}</p>
              <div className="div-profile">
                <div>
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="user-pic" className="user-pic" />
                </div>
                <div className="div-username">
                  <p className="p-username">{jobDescription.username}</p>
                  <p className="p-joineddate">Joined{dateJoined}</p>
                </div>
              </div>
              <p className="p-pay">pay: ${jobDescription.pay}</p>
              <p>{`${jobDescription.city},${jobDescription.state}`}</p>
          </div>
            <hr />
            <div className="description-div">
                <h2>{descriptionText}</h2>
                <p>{jobDescription.description}</p>
            </div>
            <button className="msg-btn">Message</button>
          </>
            :
          jobs[0] && 
          <div>
              <div className="div-details">
              <p className="p-title">{jobs[0].title}</p>
              <div className="div-profile">
                <div>
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="user-pic" className="user-pic" />
                </div>
                <div className="div-username">
                  <p className="p-username">{jobs[0].username}</p>
                  <p className="p-joineddate">Joined{dateJoined}</p>
                </div>
              </div>
              <p className="p-pay">pay: ${jobs[0].pay}</p>
              <p>{`${jobs[0].city},${jobs[0].state}`}</p>
          </div>
            <hr />
            <div className="description-div">
                <h3>{descriptionText}</h3>
                <p>{jobs[0].description}</p>
            </div>
            <button className="msg-btn">Message</button>
            </div>
          
          }
          </div>
      </div>
    </Layout>
  )
}
