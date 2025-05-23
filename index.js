import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";








try{
  await db.authenticate();
  console.log('Koneksi ke database berhasil!');
  await Auth.sync();
} catch (err) {
  console.error('Koneksi ke database gagal:', err);
}


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Ganti dengan URL frontend kamu
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Pastikan semua metode HTTP yang diperlukan diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Harus true agar cookies dapat dikirim
}));
app.use(cookieParser()); 
app.use(express.json())
app.use(UserRoute);


app.get("/", (req, res) => {
    res.send("Backend Berjalan Lancar");
  });
  

app.listen(PORT, ()=> console.log('Server up and running...'));
