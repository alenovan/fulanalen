import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve("./public/wishes.txt"); // Adjusted file path

  try {
    const data = fs.readFileSync(filePath, "utf8");
    res
      .status(200)
      .json({ success: true, wishes: data.split("\n").filter(Boolean) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load wishes." });
  }
}
