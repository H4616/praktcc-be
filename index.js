import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import Auth from "./models/AuthModel.js";


try{
  await db.authenticate();
  console.log('Koneksi ke database berhasil!');
  await Auth.sync();
} catch (err) {
  console.error('Koneksi ke database gagal:', err);
}

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.json())
app.use(UserRoute);

app.get("/", (req, res) => {
    res.send("Backend Berjalan Lancar");
  });
  

app.listen(PORT, ()=> console.log('Server up and running...'));
