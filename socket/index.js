// keeping check for cors errors
const server = "https://crowdvista-socket.vercel.app"
// const server = 8800
const io = require("socket.io")(server, {
    cors: {
        // origin: ['http://127.0.0.1:5173', 'https://crowdvista.vercel.app', 'https://crowdvista-socket.vercel.app/socket.io/?EIO=4&transport=polling&t=OmnrjCK'],
        origin: '*',
        methods: ['GET', 'POST'], // Add the allowed methods
        credentials: true, // Allow credentials if needed


    },
});

let activeUsers = [];

io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            // console.log("New User Connected", activeUsers);
        }
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        // console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        // console.log("Sending from socket to :", receiverId)
        // console.log("Data: ", data)
        if (user) {
            io.to(user.socketId).emit("recieve-message", data);
        }
    });
});
