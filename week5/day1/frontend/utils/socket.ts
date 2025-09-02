import { io,Socket } from "socket.io-client";

export interface Comment {
    text:string
}


export interface Notification {
    message : string,
    comment : Comment
}


const URL = 'https://week5day1server-production.up.railway.app/';
const socket:Socket = io(URL, { transports: ["websocket"] })


export default socket