import './MessageModal.css'
import Modal from "react-modal";
import { useState } from 'react';
import { postMessage } from "../../services/jobs"
import { verifyUser } from '../../services/users';
import Layout from '../Layout/Layout';

Modal.setAppElement("#root");
export default function MessageModal(props) {
  const [openModal, setOpenModal] = useState(false)
  const [openLogInModal, setOpenLogInModal] = useState(false)
  const [credentials, setCredentials] = useState({
  userId: '',
  jobId: '',
  message: "",
  title: '',
  description: '',
  pay: '',
  username: '',
  city: '',
  state: '',
  zipCode: '',
  date_joined: '',
  recipientId: '',
  isError: false,
  errorMsg: "",
  });
  const [isActive, setIsActive] = useState(false)
  const handleChange = (e) => {
		setCredentials({
			...credentials,
      [e.target.name]: e.target.value,
      userId: props.userId,
      jobId: props.job.id,
      title: props.job.title,
      description: props.job.description,
      pay: props.job.pay,
      username: props.job.username,
      zipCode: props.job.zipCode,
      city: props.job.city,
      state: props.job.state,
      date_joined: props.job.date_joined,
      recipientId: props.job.userId,
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

  const handleClick = async () => {
    try {
      if (props.userId) {
      const resp = await verifyUser(props.userId);
      if (resp) {
        setOpenModal(!openModal)
      }
      } else {
     setOpenLogInModal((prev) => !prev)
    }
    }
    catch (error) {
      throw error
    }
  }

  const handleExit = () => {
    setOpenModal(!openModal)
    credentials.message = ''
  }


  return (
    <Layout location={props.location} user={props.user} setUser={props.setUser} userId={props.userId} dateJoined={props.dateJoined} openLogInModal={openLogInModal} setOpenLogInModal={setOpenLogInModal}>
    <div>
      <button className="msg-btn" onClick={handleClick}>Message</button>
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
</Layout>
  )
}
