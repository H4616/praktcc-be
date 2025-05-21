import express from "express";
import { 
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser, 
} from "../controllers/UserController.js";

import { 
    getAuth,
    Register,
    Login,
    Logout
 } from "../controllers/AuthController.js"; 

import{verifyToken} from "../middleware/VerifyToken.js";
import {refreshtoken} from "../controllers/RefreshTokenController.js";

const router = express.Router();

router.get('/users' ,verifyToken , getUsers);
router.get('/users/:id', getUserById);
router.post('/users/', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser); 
router.post('/register', Register);
router.get('/auth',verifyToken, getAuth);
router.post('/login', Login);
router.get('/token', refreshtoken); //refresh token
router.delete('/logout', Logout);

export default router;