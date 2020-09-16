const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html");
});
//using express to serve up a static index.html file to the browser whenever it detects a GET request at the root

io.on("connection", (socket)=> { //server-side socket
    
    socket.on("user_join", (data)=> {
        this.username = data;
        socket.broadcast.emit("user.join", data);
    });
    //sets the username on the socket for later use and then broadcast back that data to alert others that somebody has joined
    
    socket.on("chat_message", (data)=> {
        data.username = this.username;
        socket.broadcast.emit("chat_message", data);
    });
    //attaches the username and then broadcasts to everybody else that a new message was sent

    socket.on("disconnect", (data)=> {
        socket.broadcast.emit("user_leave", this.username);
    });
    //broadcasts to everybody else that somebody has left the chat

});

http.listen(port, ()=> {
    console.log("Listening on *:" + port);
});
//tell server to listen to the port defined

