import SockJS from "sockjs-client";
import Stomp from 'stompjs';


const socket = new SockJS('http://localhost:8080/api/rides/book');
const stompClient = Stomp.over(socket);


stompClient.connect({},() => {
  console.log("Connected to websocket");
  stompClient.subscribe('/notify/bookings', (message)=> {
    console.log('Ride Update: ', JSON.parse(message.body))
  });
});