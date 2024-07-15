const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// DB connection
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use('/api/user',userRoutes);
app.use('/api/task',taskRoutes);

app.get('/',(req,res)=>{
    res.send({
        status:200,
        msg:"Welcome to to do list"
    })
})

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT,()=>{
    console.log("Server is running on Port Number ",PORT);
})

// Error handling for the server
server.on('error', (err) => {
    if (err.code === 'EACCES') {
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
    } else if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      console.error(`Server error: ${err.message}`);
      process.exit(1);
    }
});