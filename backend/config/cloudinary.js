import { v2 as cloudinary } from "cloudinary"

const connectCloudinary = async () => {

    console.log("☁️ Cloudinary ENV CHECK:", {
        cloud_name: !!process.env.CLOUDINARY_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_SECRET_KEY
    })

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    try {
        const result = await cloudinary.api.ping()
        console.log("☁️ Cloudinary PING:", result)
    } catch (error) {
        console.error("❌ Cloudinary PING ERROR:")
        console.error("message:", error.message)
        console.error("http_code:", error.http_code)
        console.error("name:", error.name)
    }
}

export default connectCloudinary;