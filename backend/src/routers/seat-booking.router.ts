import { Request, Response, Router } from 'express';
import moment from 'moment';
import sequelize from '../configs/database.config';
import Seat from '../configs/models/seat.model';
import Booking from '../configs/models/booking.model';
import User from "../configs/models/user.model";
import { where } from 'sequelize';

const router = Router();
// Utility function to check if the current date is the last 3 days of the month
const isLastThreeDaysOfMonth = (): boolean => {
  const today = moment();
  const endOfMonth = moment().endOf('month');
  const lastThreeDays = endOfMonth.subtract(2, 'days');
  return today.isAfter(lastThreeDays) && today.isBefore(endOfMonth);
};

// API to get all available seats
router.get('/seats', async (req: Request, res: Response) => {
  try {
    const allSeats = await Seat.findAll({
      include: [User],
      order: [['seatNumber', 'ASC']]
    });
    res.json(allSeats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
});

router.get('/open-booking', async (req: Request, res: Response) => {
  try {
    // Mark the seat as booked (not available)
    await Seat.update({isAvailable: true, userId: null},{where: { isAvailable: false }});

    res.status(200).json({ message: 'Booking open successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to open booking' });
  }
});

// API to book a seat
router.post('/book', async (req: Request, res: Response) => {
  const { studentId, seatId, isAdvancedBooking }: { studentId: string; seatId: string; isAdvancedBooking: boolean } = req.body;



  const alreadyReservedSeat = await Seat.findOne({ where: { userId: studentId } });

  if (alreadyReservedSeat) {
    return res.status(400).json({ error: 'Seat is already reserved' });
  }
  const seat = await Seat.findOne({ where: { id: seatId } });

  if (!seat) {
    return res.status(400).json({ error: 'Seat does not exist' });
  }

  if (!seat.isAvailable) {
    return res.status(400).json({ error: 'Seat is not available' });
  }

  // If it's an advanced booking, ensure it's the last 3 days of the month
  if (isAdvancedBooking && !isLastThreeDaysOfMonth()) {
    return res.status(400).json({
      error: 'Advanced booking is only allowed in the last 3 days of the month',
    });
  }

  // If it's not advanced booking, allow regular booking from 1st of the month onwards
  if (!isAdvancedBooking && !moment().isSameOrAfter(moment().startOf('month'))) {
    return res.status(400).json({
      error: 'Bookings can only be made starting from the 1st of the month',
    });
  }
  try {
    // Mark the seat as booked (not available)
    await seat.update({ isAvailable: false, userId: studentId });
    await Booking.create(
      {
        userId: studentId,
        seatId,
        isAdvancedBooking
      }
    );

    res.status(200).json({ message: 'Seat booked successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to book seat' });
  }
});

// API to get all bookings (for monitoring)
router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      include: [User]
    });
    res.json(bookings);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
