import NavBar from "./Navbar";
import AddIcon from '@mui/icons-material/AddRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Home() {
    //const state = useSelector((state) => state.state.state);
    //console.log(state)
    const theme = useSelector((state) => state.theme.theme);
    //console.log(theme)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className = {`${theme}`}>
    <NavBar/>
      <div className=" h-[250px] dark:bg-slate-600 bg-[#BFEAF5] w-[450px] rounded-3xl flex flex-row justify-center items-center space-x-[29px] transition ease-in delay-150">
        <div className="flex flex-col justify-center items-center space-y-2 mt-2">
            <button className=" h-[150px] w-[180px] bg-slate-100 hover:bg-slate-200 hover:delay-0 hover:dark:bg-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition ease-in delay-150" >
                <AddIcon sx={{ fontSize: 90 }}/>
            </button>
            <text className=" text-lg font-semibold text-[#0A2647] dark:text-[#EAFDFC] transition ease-in delay-150">Create</text>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2 mt-2">
            <div className=" h-[150px] w-[180px] bg-slate-100 hover:bg-slate-200 hover:dark:bg-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition ease-in delay-150">
                <MeetingRoomRoundedIcon sx={{ fontSize: 90 }}/>
            </div>
            <text className=" text-lg font-semibold text-[#0A2647] dark:text-[#EAFDFC] transition ease-in delay-150" onClick={null}>Join</text>
        </div>
      </div>
      <Modal show>
      <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}