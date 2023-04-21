import { prisma } from "../../db/index.js";

import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    if (newUser) {
      res.status(201).json({
        succes: true,
        data: newUser,
      });
    } else {
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "something went wrong",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    

    const getUser = await prisma.user.findFirst({
      where:{
        email:req.body.email
      }
    })

    if (getUser) {
      res.status(201).json({
        succes: true,
        data: getUser,
      });
    } 


  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "something went wrong",
    });
  }
});






export default router