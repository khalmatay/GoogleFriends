import SchedulingService from "./schedulingService";

async function  WebSocket() {
  const socket = new WebSocket("ws://localhost:5000/");
  const nameSocket = new SchedulingService();
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "connection",
          username: JSON.parse(localStorage.getItem("name")).name,
        })
      );
    };

    socket.onmessage = (event) => {
      console.log("С сервера пришло сообщение", event.data);
    };
  
}
export default WebSocket;