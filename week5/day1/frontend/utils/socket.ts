import { io,Socket } from "socket.io-client";

export interface Comment {
    text:string
}


export interface Notification {
    message : string,
    comment : Comment
}


const URL = 'http://localhost:3001';
const socket:Socket = io(URL, { transports: ["websocket"] })


export default socket