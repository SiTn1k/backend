"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const router = (0, express_1.Router)();
router.post("/telegram", async (req, res) => {
    try {
        const { telegram_id, username, first_name, last_name, photo_url, language_code, } = req.body;
        if (!telegram_id) {
            return res.status(400).json({
                success: false,
                message: "telegram_id required",
            });
        }
        let user = await prisma_1.prisma.user.findUnique({
            where: {
                telegramId: BigInt(telegram_id),
            },
        });
        if (!user) {
            user = await prisma_1.prisma.user.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.default = router;
