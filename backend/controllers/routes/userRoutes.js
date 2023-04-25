import { prisma } from "../../db/index.js";

import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  
  try {
    const newUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
   

    if (newUser) {
      res.status(200).json({
        succes: true,
        data: newUser,
      });
    } else {
      res.status(404).json({
        succes: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "something went wrong",
    });
  }
});



router.post("/signup", async (req, res) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (getUser) {
      res.status(409).json({
        succes: false,
        message: "already have an account",
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      if (newUser) {
        res.status(201).json({
          succes: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: "something went wrong",
    });
  }
});

export default router;
