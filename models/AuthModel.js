import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Auth = db.define('auth',{
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
},{
    freezeTableName: true
})

export default Auth;

(async()=> {
    await db.sync();
})();