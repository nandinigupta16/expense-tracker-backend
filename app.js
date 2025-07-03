const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();

//! MongoDB connection
mongoose
  .connect("mongodb+srv://nandini:nandini1234@cluster0.dbtmetb.mongodb.net/expenseTracker?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("MongoDB connection error:", e));

//! CORS config
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://expense-tracker-frontend-wdda.vercel.app"
  ],
  credentials: true,
};


app.use(cors(corsOptions));

//! Middleware
app.use(express.json());

//! Routes
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);

//! Error Handler
app.use(errorHandler);

//! Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
