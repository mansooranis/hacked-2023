import Question from "./question.js"
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
const WS = require('../URL').WS;

export default function Questions(){
    //const socket = useRef()
    const roomcodenum = useSelector((state) => state.room["room"])
    //console.log(roomcodenum);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const socket = socketIOClient(WS);
        socket.emit('connection', () => {
            setIsConnected(true);
          });
        socket.emit("join-room", roomcodenum, (result) => {
            console.log(result);
        } )
    },[])
    return (
        <div className="flex flex-row h-full w-full bg-[#BFEAF5]">
            <div className="flex flex-col w-9/12 bg-[#BFEAF5] dark:bg-[#0A2647] items-center relative">
                <text className=" text-2xl self-start ml-4 mt-4 text-[#0A2647] dark:text-[#EAFDFC] mb-3">Questions</text>
                <Question question="akFGLDgbfb" total={20} username = "me"/>
                <textarea className="h-[50px] w-[65%] mb-3 rounded-xl border-2 border-slate-900 transition ease-in delay-150 pl-3 fixed bottom-0" placeholder="Type your question" />
            </div>
        </div>
    )
}