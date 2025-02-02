import sequelize from "../database.config";
import {DataTypes} from "sequelize";
import UserModel from "./user.model";
import User from "./user.model";

const Booking = sequelize.define('booking', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    seatId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    isAdvancedBooking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

});
Booking.belongsTo(User, { foreignKey: 'userId' });

export default Booking;
