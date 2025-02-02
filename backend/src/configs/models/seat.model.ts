import sequelize from "../database.config";
import {DataTypes, UUIDV4} from "sequelize";
import User from "./user.model";

const Seat = sequelize.define('seat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

});

Seat.belongsTo(User, { foreignKey: 'userId' })

export default Seat;
