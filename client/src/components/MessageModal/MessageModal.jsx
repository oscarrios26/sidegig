import './MessageModal.css'
import Modal from "react-modal";
import { useState } from 'react';
import { postMessage } from "../../services/jobs"

Modal.setAppElement("#root");
export default function MessageModal(props) {
  const [openModal, setOpenModal] = useState(false)
  const [credentials, setCredentials] = useState({
  userId: props.userId,
  jobId: props.jobId,
  message: "",
  isError: false,
  errorMsg: "",
  });
  const [isActive, setIsActive] = useState(false)
  const handleChange = (e) => {
    console.log(e.target.value)
		setCredentials({
			...credentials,
      [e.target.name]: e.target.value,
      jobId: props.jobId
		});
	};

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await postMessage(credentials);
    setOpenModal(!openModal)
    setIsActive(!isActive);
    credentials.message = ''
  } catch (error) {
    throw error
  }
	};

  const handleExit = () => {
    setOpenModal(!openModal)
    credentials.message = ''
  }


  return (
    <div>
      <button className="msg-btn" onClick={() => setOpenModal(!openModal)}>Message</button>
      <Modal isOpen={openModal} className="messageModal">
        <p className='exit-message-modal' onClick={handleExit}>X</p>
        <form action="POST" onSubmit={handleSubmit}>
        <div className='parent-comment-div'>
        <div>
          <p className='p-send-message'>Send Message</p>
        </div>
        <div className='textarea'>
          <textarea rows="7" cols="40" placeholder="Your Message (I'm interested in this job)" autoFocus value={credentials.message} name="message" onChange={handleChange}/>
        </div>
          <button className="message-btn">Submit</button>
          </div>
        </form>
      </Modal>


      <div className={isActive ? 'wrapper' : 'inactive'}>
  <div className={isActive ? 'modal_wrapper active' : ''}>
    <div className="shadow close_btn"></div>
    
    <div className="modal">
      <div className="modal_item s_modal active">
        <div className="modal_body">
          <div className="s_icon">
          <ion-icon name="checkmark"></ion-icon>
        </div>
        <div className="s_text">
          <h2>Sent</h2>
        </div>
        </div>
        <div className="s_button">
          <button className="success_btn" onClick={()=> setIsActive(!isActive)}>Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
