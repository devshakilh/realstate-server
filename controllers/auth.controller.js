import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";


export const register = async (req, res) => {
  const { username, email, password, role = "user" } = req.body; // Default role is "user"

  // Validate username length
  if (username.length < 3) {
    return res.status(400).json({ message: "Username must be at least 3 characters long" });
  }

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username }, // Check for existing username
          { email },    // Check for existing email
        ],
      },
    });

    if (existingUser) {
      // Determine which field caused the error
      const field = existingUser.username === username ? "username" : "email";

      return res.status(400).json({
        message: `${field === "email" ? "Email" : "Username"} already exists`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role, // Assign role (defaults to "user" unless specified)
      },
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};


// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // CHECK IF THE USER EXISTS

//     const user = await prisma.user.findUnique({
//       where: { username },
//     });

//     if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

//     // CHECK IF THE PASSWORD IS CORRECT

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid)
//       return res.status(400).json({ message: "Invalid Credentials!" });

//     // GENERATE COOKIE TOKEN AND SEND TO THE USER

//     // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
//     const age = 1000 * 60 * 60 * 24 * 7;

//     const token = jwt.sign(
//       {
//         id: user.id,
//         isAdmin: false,
//       },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: age }
//     );

//     const { password: userPassword, ...userInfo } = user;

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         // secure:true,
//         maxAge: age,
//       })
//       .status(200)
//       .json(userInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to login!" });
//   }
// };


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // Generate a token and send to the user
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.role === "admin", // Check if the user is an admin
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};




