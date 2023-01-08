import NavBar from "./Navbar";
import AddIcon from '@mui/icons-material/AddRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { useSelector, useDispatch } from 'react-redux'
import React, { useCallback, useState } from 'react';
import { setRoom } from "../feature/room/roomslice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const URL = require('../URL').URL;

export default function Home() {
    //const state = useSelector((state) => state.state.state);
    //console.log(state)
    const theme = useSelector((state) => state.theme.theme);
    //console.log(theme)
    const [showmodals, setShowmodals] = useState(false);
    const [username, setUsername] = useState("");
    const [roomid, setRoomid] = useState("");
    const dispatch = useDispatch();
    const roomcodenum = useSelector((state) => state.room["room"]);
    const navigate = useNavigate();
    const createRoom = useCallback(async () =>{
      try{
        const response = axios.get(`${URL}/api/rooms/create`).then((res) => {
          dispatch(setRoom(res.data["roomCode"]));
          navigate(`/${res.data["roomCode"]}`)
        });
        
      }catch(e){
        console.log(e)
      }
    }, []);
  return (
    <div className = {`${theme}`}>
    <NavBar/>
    {showmodals?
    <div className=" h-[250px] dark:bg-slate-600 bg-[#BFEAF5] w-[450px] rounded-3xl flex flex-row justify-center items-center space-x-[29px] transition ease-in delay-150">
      <button className="  border-slate-900" onClick={()=>setShowmodals(false)}>
        <KeyboardBackspaceRoundedIcon sx={{ fontSize: 20 }}/>
      </button>
      <div className=" flex flex-col space-y-2">
        <input className=" h-[50px] w-[300px] rounded-xl border-2 border-slate-900 transition ease-in delay-150 pl-3" placeholder="Enter Room ID" onChange={(e) => setRoomid(e.target.value)}/>
        <input className=" h-[50px] w-[300px] rounded-xl border-2 border-slate-900 transition ease-in delay-150 pl-3" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
        <button className=" h-[25px] w-[60px] rounded-lg text-sm font-light bg-slate-100 hover:bg-slate-200 hover:dark:bg-slate-300">Join</button>
      </div>
    </div>
      :
      <div className=" h-[250px] dark:bg-slate-600 bg-[#BFEAF5] w-[450px] rounded-3xl flex flex-row justify-center items-center space-x-[29px] transition ease-in delay-150">
        <div className="flex flex-col justify-center items-center space-y-2 mt-2">
            <button className=" h-[150px] w-[180px] bg-slate-100 
            hover:bg-slate-200 hover:delay-0 hover:dark:bg-slate-300 
            rounded-xl flex flex-col items-center justify-center cursor-pointer 
            transition ease-in delay-150" onClick={createRoom} >
                <AddIcon sx={{ fontSize: 90 }}/>
            </button>
            <text className=" text-lg font-semibold text-[#0A2647]
             dark:text-[#EAFDFC] transition ease-in delay-150">Create</text>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2 mt-2">
            <button className=" h-[150px] w-[180px] bg-slate-100 hover:bg-slate-200
             hover:dark:bg-slate-300 rounded-xl flex flex-col items-center 
             justify-center cursor-pointer transition ease-in delay-150" 
             onClick={() => setShowmodals(true)}>
                <MeetingRoomRoundedIcon sx={{ fontSize: 90 }}/>
            </button>
            <text className=" text-lg font-semibold text-[#0A2647] dark:text-[#EAFDFC] transition ease-in delay-150" >Join</text>
        </div>
      </div>
  }
    </div>
  )
}