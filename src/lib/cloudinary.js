import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'posts',
        use_filename: true,
        unique_filename: true
      },
      (error, result) => {
        if (error) {
          return reject(new Error('Error uploading image to cloudinary'))
        }
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}
