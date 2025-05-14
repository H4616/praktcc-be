import { Sequelize } from "sequelize";

const db = new Sequelize('note_db','root','', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
        dialectOptions: {
        connectTimeout: 30000,  // Timeout lebih lama (30 detik)
    },
});

// Memeriksa koneksi ke database
db.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil!');
    })
    .catch((err) => {
        console.error('Koneksi ke database gagal:', err);
    });

export default db;
