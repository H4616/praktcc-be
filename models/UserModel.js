import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;
const User = db.define('users', {
    username: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    note: DataTypes.TEXT,
    deadline: DataTypes.DATE
}, {
    freezeTableName: true
});

export default User;

(async()=> {
    await db.sync();
})();