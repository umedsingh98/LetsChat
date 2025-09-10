import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";

//------------------------------ Signup a new user ------------------------------
export const signup = async (req, res) => {
  const { fullname, email, password, bio } = req.body;

  try {
    //check for all fields data
    if (!fullname || !email || !password || !bio) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    //find if there is this mail already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.status(400).json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//---------------------- Login a new user ------------------------------

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Password is incorrect." });
    }

    const token = generateToken(userData._id);

    res.status(400).json({
      success: true,
      userData,
      token,
      message: "Logged in successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



