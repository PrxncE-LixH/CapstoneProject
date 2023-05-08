import { prisma } from "../../db/index.js";
import passport from "passport";
import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = express.Router();
// login

router.post("/login", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (foundUser) {
      try {
        const verifyPassword = await argon2.verify(
          foundUser.password,
          req.body.password
        );

        if (verifyPassword === true) {
          const token = jwt.sign(
            {
              id: foundUser.id,
              email: foundUser.email,
            },

            process.env.SECRET_KEY
          );

          res.status(200).json({
            success: true,
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "wrong username or password",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (foundUser) {
      res.status(401).json({
        success: false,
        message: "User already exist",
      });
    } else {
      // hashing password
      try {
        const newUser = await prisma.user.create({
          data: {
            password: req.body.password,
            email: req.body.email,
          },
        });

        if (newUser) {
          res.status(201).json({
            success: true,
            message: "User successfully created",
          });
        } else {
          res.status(500).json({
            success: false,
            message: "User was not created. Something happened",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "User was not created. Something happened",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// get current user
router.get(
  "/auth",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    try {
      const currentUser = req.user;

      if (currentUser) {
        res.status(200).json({
          success: true,
          data: currentUser,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  }
);

export default router;
