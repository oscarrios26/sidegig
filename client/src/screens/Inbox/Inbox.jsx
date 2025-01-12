import Layout from "../../components/Layout/Layout"
import { useState, useEffect } from "react";
import { getMessages } from "../../services/jobs"
import moment from "moment";
import "./Inbox.css"

export default function Inbox(props) {
  const [inbox, setInbox] = useState([])
  const [message, setMessage] = useState("")
  const [jobDetails, setJobDetails] = useState({})
  
  useEffect(() => {
    if (props.userId) {
      const fetchUser = async () => {
        const messages = await getMessages(props.userId);
        console.log(messages)
        findDuplicates(messages);
      };
      fetchUser();

  function findDuplicates(arr) {
    const sameInstances = arr.filter((obj, index, self) => 
  index !== self.findIndex(el => el.userId === obj.userId)
);

console.log(sameInstances);
}
}


  }, [props.userId])
  
  const handleClick = (message) => {
    setMessage(message.message)
    setJobDetails({
      title: message.title,
      description: message.description,
      pay: message.pay,
      city: message.city,
      state: message.state
    })
  }
  
  return (
    <Layout location={props.userLocation} user={props.user} setUser={props.setUser} userId={props.userId} dateJoined={props.dateJoined}>
      <div className="inbox-parent-div">
      <div className="inbox-main-div">
        <div className="inbox-username-div">
        {
          inbox.map((message) => (
            <div className="message-list-div" onClick={()=>handleClick(message)}>
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="inbox-user-pic" />
              <p>{message.username}</p>
              <p>{moment(message.message_created_at).format('LL')}</p>
            </div>
          ))
          }
        </div>
          <div className="inbox-message-div">
            <div className="messages-feed-div">
              <p>{message}</p>
            </div>
            
            <div className="textarea-div">
              <textarea></textarea>
            </div>
        </div>
        <div className="inbox-job-div">
            <p>{jobDetails.title}</p>
            <p>{jobDetails.description}</p>
            <p>{jobDetails.pay}</p>
        </div>
        </div>
        </div>
    </Layout>
  )
}
