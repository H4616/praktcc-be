import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAuth = async (req, res) => {
	try {
		const auth = await Auth.findAll({
			attributes: ["id", "username", "email"],
		});
		res.json(auth);
	} catch (error) {
		console.log(error);
	}
};

export const Register = async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	if (!username || !password || !email || !confirmPassword)
		return res.status(400).json({ msg: "Silahkan isi semua field" });
	if (password !== confirmPassword)
		return res.status(400).json({ msg: "Password tidak sama" });
	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		await Auth.create({
			username: username,
			password: hashPassword,
			email: email,
		});
		res.json({ msg: "Register Berhasil" });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const Login = async (req, res) => {
	try {
		// Check if user exists
		const user = await Auth.findOne({
			where: {
				email: req.body.email,
			},
		});

		// If user is not found, return error
		if (!user) return res.status(400).json({ msg: "Email tidak ditemukan" });

		// Check if password is correct
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) return res.status(400).json({ msg: "Password salah" });

		// Create JWT tokens
		const userId = user.id;
		const userName = user.username;
		const userEmail = user.email;

		// Create access and refresh tokens
		const accesstoken = jwt.sign(
			{ userId, userName, userEmail },
			process.env.ACCESS_TOKEN,
			{ expiresIn: "30s" }
		);
		const refreshtoken = jwt.sign(
			{ userId, userName, userEmail },
			process.env.REFRESH_TOKEN,
			{ expiresIn: "1d" }
		);

		// Save the refresh token in the database
		await Auth.update(
			{ refresh_token: refreshtoken },
			{
				where: {
					id: userId,
				},
			}
		);

		// Set the refresh token in a cookie
		res.cookie("refreshtoken", refreshtoken, {
			httpOnly: true, // Cookie hanya dapat diakses oleh server
			sameSite: "None", // Agar cookie dapat digunakan lintas domain
			maxAge: 24 * 60 * 60 * 1000, // 1 hari
		});

		// Send the access token in the response
		res.json({ accesstoken });
	} catch (error) {
		console.log(error); // Log the error for debugging
		res.status(400).json({ msg: "Terjadi kesalahan saat login" });
	}
};

export const Logout = async (req, res) => {
	const refreshtoken = req.cookies.refreshtoken;
	if (!refreshtoken) return res.sendStatus(204); // No content
	const auth = await Auth.findOne({
		where: {
			refresh_token: refreshtoken,
		},
	});
	if (!auth) return res.sendStatus(204);
	const userId = auth.id;
	await Auth.update(
		{ refresh_token: null },
		{
			where: {
				id: userId,
			},
		}
	);
	res.clearCookie("refreshtoken", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
	});
	return res.sendStatus(200);
};
