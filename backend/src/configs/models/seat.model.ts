import sequelize from "../database.config";
import {DataTypes} from "sequelize";

const Seat = sequelize.define('seat', {
    seatNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

});

export default Seat;
