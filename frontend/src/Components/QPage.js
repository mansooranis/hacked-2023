import Question from "./question.js"
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import {useParams, useSearchParams} from "react-router-dom";
const WS = require('../URL').WS;

export default function Questions(){
    const roomcodenum = useParams().roomCode;
    //const socket = useRef()
    //const roomcodenum = useSelector((state) => state.room["room"])
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState([])
    const [showthemesg, setShowthemesg] = useState([])
    //console.log(roomcodenum);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const socket = socketIOClient(WS);
        //console.log(roomcodenum)
        socket.on('connection', () => {
            setIsConnected(true);
          });
        socket.emit("join-room", roomcodenum, (result) => {
            const msgs = result.map((message) => {
                return <Question question={message["value"]} total={message["score"]} username = "me"/>
            })
            setShowthemesg(msgs)
        })
    },[])
    useEffect(() => {
        const msgs = messages.map((message) => {
            return <Question question={message["value"]} total={message["score"]} username = "me"/>
        })
        setShowthemesg(msgs)
    },[messages])
    const submitQue =  React.useCallback( async () => {
        const socket = socketIOClient(WS);
        socket.emit("new-question", {roomCode: roomcodenum, message: message}, (result) => {
            console.log(result,"hello");
        }   )
        socket.on("new-question", (result) => {
            console.log(result);
            setMessages(result);
        }   )
    })
    return (
        <div className="flex flex-row h-full w-full bg-[#BFEAF5]">
            <div className="flex flex-col w-9/12 bg-[#BFEAF5] dark:bg-[#0A2647] items-center relative">
                <text className=" text-2xl self-start ml-4 mt-4 text-[#0A2647] dark:text-[#EAFDFC] mb-3">Questions</text>
                {showthemesg}
                <div className="flex flex-row space-y-3">
                    <textarea className="h-[50px] w-[65%] mb-3 rounded-xl border-2 border-slate-900 transition ease-in delay-150 pl-3 fixed bottom-0 left-0" 
                    placeholder="Type your question"
                    onChange={(e)=> {setMessage(e.target.value)}} />
                    <button className=" fixed bottom-0 right-0" onClick={submitQue}>submit</button>
                </div>
            </div>
        </div>
    )
}