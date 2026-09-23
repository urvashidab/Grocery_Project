import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";

// registeration
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fileds can not be empty" });
    }

    const existedUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existedUser) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }
  } catch (error) {}
};
