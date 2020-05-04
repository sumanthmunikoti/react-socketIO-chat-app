import socketIO from "socket.io"

const PORT = 5000
const io = socketIO(5000);

io.on('connection', (socket) => {
    console.log("Conn established")
  socket.on('message', (data) => { 
      console.log("Message received:", data)
  });

  socket.on('newChatMessage', data => {
    console.log(data)
    io.emit("newChatMessage", data)
  })

  socket.on('disconnect', () => { 
    console.log("Disconnected")
  });
});

console.log(`At the server port ${PORT}`)