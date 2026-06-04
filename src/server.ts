import authRoutes from "./routes/auth";
import express from "express";
import cors from "cors";
import { prisma } from "./prisma";

const app = express();

app.use(cors({
    origin: ['https://unrivaled-brigadeiros-ce6749.netlify.app', 'https://virtual-museum-api.onrender.com', 'https://*.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Virtual Museum API running"
  });
});

app.get("/db-test", async (_, res) => {
  const users = await prisma.user.findMany();

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