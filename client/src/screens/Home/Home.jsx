import "./Home.css"
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import LogIn from "../../components/LogIn/LogIn";
import { savedJobs } from "../../services/users";
import { useState } from "react";

export default function Home(props) {
  const [jobDescription, setJobDescription] = useState('')
  const [logInModal, setLogInModal] = useState(false)

  const handleSaveJob = async(job)=> {
    try {
      const resp = await savedJobs({
        ...job,
        mainUserId: props.userId
      })
      return resp
    } catch (error) {
      throw error
    }
  }
  
  return (
    <Layout location={props.userLocation} user={props.user} setUser={props.setUser} userId={props.userId} dateJoined={props.dateJoined} logInModal={logInModal} setLogInModal={setLogInModal}>
    <div className="home-flex-container">
      <div className="job-title">
              {props.jobs.map((job) => (
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
                  <p className="p-joineddate">Joined{props.dateJoined}</p>
                </div>
              </div>
              <p className="p-pay">pay: ${jobDescription.pay}</p>
              <p>{`${jobDescription.city},${jobDescription.state}`}</p>
          </div>
            <hr />
            <div className="description-div">
                <h2>{props.descriptionText}</h2>
                <p>{jobDescription.description}</p>
              </div>
              <div>
                <button className="msg-btn">Message</button>
                <button className="msg-btn" onClick={()=>handleSaveJob(jobDescription)}>Save <i class="fa fa-heart"></i></button>
              </div>
          </>
            :
          props.jobs[0] && 
          <div>
              <div className="div-details">
              <p className="p-title">{props.jobs[0].title}</p>
              <div className="div-profile">
                <div>
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="user-pic" className="user-pic" />
                </div>
                <div className="div-username">
                  <p className="p-username">{props.jobs[0].username}</p>
                  <p className="p-joineddate">Joined{props.dateJoined}</p>
                </div>
              </div>
              <p className="p-pay">pay: ${props.jobs[0].pay}</p>
              <p>{`${props.jobs[0].city},${props.jobs[0].state}`}</p>
          </div>
            <hr />
            <div className="description-div">
                <h3>{props.descriptionText}</h3>
                <p>{props.jobs[0].description}</p>
            </div>
                <button className="msg-btn" onClick={() => <LogIn logInModal={!logInModal} />}>Message</button>
                <button className="msg-btn" onClick={()=>handleSaveJob()}>Save <i class="fa fa-heart"></i></button>
            </div>
          
          }
          </div>
      </div>
    </Layout>
  )
}
