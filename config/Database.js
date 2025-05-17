import { Sequelize } from "sequelize";

const db = new Sequelize('notedb','habib','habib123', {
    host: '34.101.248.121', // gunakan Public IP Cloud SQL
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
        connectTimeout: 30000,
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
