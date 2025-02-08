import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from "express";
import cors from "cors";
import userRouter from './routers/user.router';
// import bookingRouter from './routers/seat-booking.router';
import sequelize from './configs/database.config';
import seatBookingRouter from "./routers/seat-booking.router";

const app = express();
app.use(express.json());
app.use(cors())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/users", userRouter);
app.use("/api/", seatBookingRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

// sequelize.sync().then(()=>{
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
// });
