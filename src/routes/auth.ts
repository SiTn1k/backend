import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.post("/telegram", async (req, res) => {
  try {
    const {
      telegram_id,
      username,
      first_name,
      last_name,
      photo_url,
      language_code,
    } = req.body;

    if (!telegram_id) {
      return res.status(400).json({
        success: false,
        message: "telegram_id required",
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        telegramId: BigInt(telegram_id),
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: BigInt(telegram_id),
          username,
          firstName: first_name || "",
          lastName: last_name,
          photoUrl: photo_url,
          languageCode: language_code,
        },
      });
    }

    return res.json({
        success: true,
        user: {
          ...user,
          telegramId: user.telegramId.toString(),
        },
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;