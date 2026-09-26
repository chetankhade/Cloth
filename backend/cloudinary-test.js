import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY
});

const filePath = "C:/Users/rachi/AppData/Local/Temp/shopping.webp";

try {
    console.log("☁️ Testing UNSIGNED upload...");
    console.log("Cloud name:", process.env.CLOUDINARY_NAME);
    console.log("Preset: foreverstore_test");

    const result = await cloudinary.uploader.unsigned_upload(
        filePath,
        "foreverstore_test",
        {
            resource_type: "image"
        }
    );

    console.log("✅ UNSIGNED UPLOAD SUCCESS");
    console.log("URL:", result.secure_url);

} catch (error) {
    console.log("❌ UNSIGNED UPLOAD FAILED");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);
    console.dir(error, { depth: 10 });
}