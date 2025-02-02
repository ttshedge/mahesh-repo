import sequelize from "../database.config";
import {DataTypes, UUIDV4} from "sequelize";
import UserModel from "./user.model";
import User from "./user.model";

const Booking = sequelize.define('booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    seatId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isAdvancedBooking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

});
Booking.belongsTo(User, { foreignKey: 'userId' });

export default Booking;
