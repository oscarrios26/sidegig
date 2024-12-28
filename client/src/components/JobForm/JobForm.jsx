import './JobForm.css'
import { useState } from "react";
import Modal from "react-modal";
import { postJob } from '../../services/jobs';

Modal.setAppElement("#root");
export default function JobForm({userId, userName}) {
  const [modal, setModal] = useState(false)
  const [jobPost, setJobPost] = useState({
    title: "",
		description: "",
		pay: "",
    username: userName,
    userId: userId,
    city: "",
    state: "", 
    zipCode: "",
  })

    const handleChange = (e) => {
      setJobPost({
			...jobPost,
			[e.target.name]: e.target.value,
		});
    };
  
  const onSubmit = async (event) => {
		event.preventDefault();
    try {
      await postJob(jobPost)
		} catch (error) {
			// setCredentials({
			// 	isError: true,
			// 	errorMsg: "Invalid Credentials",
			// 	email: "",
			// 	password: "",
			// });
		}
  };
  
  return (
    <>
      <button onClick={()=> setModal(!modal)}>
        List Job
      </button>
      <div>
        <Modal isOpen={modal} className="parent-modal-div">
          <form action="POST" onSubmit={onSubmit}>
            <div className='formjob-div'>
            <input
              type="text"
              placeholder='title'
              value={jobPost.title}
              name="title"
              onChange={handleChange} />
            <input
              type="text"
              placeholder='description'
              value={jobPost.description}
              name="description"
              onChange={handleChange} />
            <input
              type="text"
              placeholder='pay'
              value={jobPost.pay}
              name="pay"
              onChange={handleChange} />
              Location:
            <select>
              <option value="United Stated">United Stated</option>
            </select>
  
            <input
              placeholder="city"
              type="text"
              value={jobPost.city}
              name="city"
              onChange={handleChange} />
            <input
              placeholder="state"
              type="text"
              value={jobPost.state}
              name="state"
              onChange={handleChange} />
            <input
              placeholder="zip-code"
              type="text"
              value={jobPost.zipCode}
              name="zipCode"
              onChange={handleChange} />
              <button className="signup-btn">Sign Up</button>
              </div>
          </form>
        </Modal>
      </div></>
  )
}
