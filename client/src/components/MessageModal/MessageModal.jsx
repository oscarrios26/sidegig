import './MessageModal.css'
import Modal from "react-modal";
import { useState } from 'react';

Modal.setAppElement("#root");
export default function MessageModal() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <button className="msg-btn" onClick={() => setOpenModal(!openModal)}>Message</button>
      <Modal isOpen={openModal} className="messageModal">
        <p className='exit-message-modal' onClick={()=> setOpenModal(!openModal)}>X</p>
        <div className='parent-comment-div'>
        <div>
          <p className='p-send-message'>Send Message</p>
        </div>
        <div className='textarea'>
          <textarea rows="7" cols="40" placeholder='Your Message (In interested in this job)' autoFocus/>
          </div>
          <button className="message-btn">Submit</button>
        </div>
      </Modal>
    </div>
  )
}
