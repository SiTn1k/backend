"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./routes/auth"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./prisma");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Virtual Museum API running"
    });
});
app.get("/db-test", async (_, res) => {
    const users = await prisma_1.prisma.user.findMany();
    res.json({
        success: true,
        users: users.map((u) => ({
            ...u,
            telegramId: u.telegramId?.toString(),
        })),
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
