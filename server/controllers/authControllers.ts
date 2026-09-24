import { Request, Response, CookieOptions } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";

// set cookie
const cookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  httpOnly: true, // XSS protection. prevents client side JS to read cookie
  secure: process.env.NODE_ENV === "production", // sent only over HTTP in production
  sameSite: "lax",
};

// registration
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // empty fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields are required" });
    }

    // password length validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // email already registered
    const existedUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existedUser) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "CUSTOMER", // forced
      },
    });

    // generate token
    const token = jwt.sign(
      {
        userID: user.id,

        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "7d",
      },
    );
    // send token in cookie
    res.cookie("token", token, cookieOptions);
    // success
    return res
      .status(201)
      .json({ message: "Email is registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error while registeration" });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check if empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "fields can not be empty",
      });
    }
    // check if email is registered or not
    const normalizedEmail = email.toLowerCase().trim();

    const registeredUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!registeredUser) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // check for valid credentails

    const matchedPassword = await bcrypt.compare(
      password,
      registeredUser.password,
    );

    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // generate token
    const token = jwt.sign(
      {
        userID: registeredUser.id,

        email: registeredUser.email,
        role: registeredUser.role,
      },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "7d",
      },
    );

    // send token in cookie
    res.cookie("token", token, cookieOptions);
    // success

    return res.status(200).json({
      message: "User login successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error, something went wrong" });
  }
};

// logout

export const logout = async (req: Request, res: Response) => {
  try {
    // clear cookies

    res.clearCookie("token", cookieOptions);
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error, something went wrong" });
  }
};
