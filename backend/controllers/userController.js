import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";

//------------------------------ Signup a new user ------------------------------
export const signup = async (req, res) => {
  const { fullname, email, password, bio } = req.body;

  try {
    //check for all fields data
    if (!fullname || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //find if there is this mail already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists." });
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

    res.json({
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
      return res.json({ success: false, message: "Password is incorrect." });
    }

    const token = generateToken(userData._id);

    res.json({
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

//Controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

//Controller to update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullname } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullname },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilepic: upload.secure_url, bio, fullname },
        { new: true }
      );
    }

    res.status().json({success: true, user: updatedUser})
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message});
  }
};
