import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const filePath = path.resolve("./public/wishes.txt"); // Adjusted file path
    const { name, message, attend, timestamp } = req.body;

    const wishEntry = `${timestamp} | ${name} (${attend}): ${message}\n`;

    try {
      fs.appendFileSync(filePath, wishEntry, "utf8");
      res
        .status(200)
        .json({ success: true, message: "Wish saved successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to save wish." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
