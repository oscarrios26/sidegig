import './JobForm.css'
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function JobForm() {
  const [modal, setModal] = useState(false)
  const [jobPost, setJobPost] = useState({
    title: "",
		description: "",
		pay: "",
    username: "",
    userId: "",
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
  
  return (
    <>
      <button onClick={()=> setModal(!modal)}>
        List Job
      </button>
      <div>
        <Modal isOpen={modal} className="parent-modal-div">
          <form action="POST">
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
              name="zip-code"
              onChange={handleChange} />
              <button className="signup-btn">Sign Up</button>
              </div>
          </form>
        </Modal>
      </div></>
  )
}
