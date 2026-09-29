import { Request, Response, NextFunction, CookieOptions } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

// set cookie
const cookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  httpOnly: true, // prevents client-side JS from reading cookie
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

// registration
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    // empty fields
    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    // password length validation
    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    // email already registered
    const existedUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existedUser) {
      throw new AppError("This email is already registered", 409);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "CUSTOMER",
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
    return res.status(201).json({
      message: "Email is registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // check if empty fields
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    // check if email is registered or not
    const normalizedEmail = email.toLowerCase().trim();

    const registeredUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!registeredUser) {
      throw new AppError("Invalid email or password", 401);
    }

    // check for valid credentials
    const matchedPassword = await bcrypt.compare(
      password,
      registeredUser.password,
    );

    if (!matchedPassword) {
      throw new AppError("Invalid email or password", 401);
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
    next(error);
  }
};

// logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // clear cookie
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};
