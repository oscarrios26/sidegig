import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSavedJobs } from "../../services/users"
import Layout from "../../components/Layout/Layout"
import moment from "moment";
import "./SavedJobs.css"

export default function SavedJobs(props) {
  const { userId } = useParams();
  const [savedJob, setSavedJob] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await getSavedJobs(userId);
      setSavedJob(resp.reverse())
			};
			fetchUser();
  }, [userId])

  
  return (
    <Layout location={props.userLocation} user={props.user} setUser={props.setUser} userId={props.userId} dateJoined={props.dateJoined} jobs={props.jobs} descriptionText={props.descriptionText}>
      <div className="main-div">
        <p className="p-saved-jobs">Saved Jobs</p>
        {!savedJob.length ?
          <p className="p-no-jobs">No saved jobs currently</p>
          :
          savedJob.map((job) => (
        <>
        <div className="card-div">
        <div className="saved-jobs-userpic">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="user-pic" className="user-pic" />
        </div>
        <div className="saved-jobs-div"> 
          <p className="p-job-title">{job.title}</p>  
          <p className="p-job-city">{job.city}, {job.state}</p>
          <p className="p-job-date">{`Saved on ${moment(job.saved_at).format('LL')}`}</p>
        </div>
          <div className="trash-div">
            <i class="fa fa-trash-o"></i>
          </div>
          </div>
          <hr width="90%" className="hr-jobs"/>
          </>
      ))}
    </div>
    </Layout>
  )
}
