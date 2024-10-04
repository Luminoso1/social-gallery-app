import { auth } from '@/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'
import connectDB, { getUserByNickOrEmail } from '@/lib/db'
import Photo from '@/models/Photo'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const session = await auth()

    if (!session) {
      // return res.status(401).json({ message: 'Unauthorized' })
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    console.log(session)
    await connectDB()

    // const user = await getUserByNickOrEmail(
    //   session.user.nick,
    //   session.user.email
    // )

    const formData = await req.formData()

    const photos = formData.getAll('photos')
    const values = formData.getAll('values')
    const imagesId = []

    if (photos?.length) {
      for (let i = 0; i < photos.length; i++) {
        const file = photos[i]

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const result = await uploadToCloudinary(buffer)

        const photoUrl = result.secure_url
        const info = values[i] ?? {}

        console.log('CLOUD URL PHOTO: ', photoUrl)

        const newPhoto = await Photo.create({
          photoUrl: photoUrl,
          ...info
        })

        // push id to images id
        imagesId.push(newPhoto._id)
      }
    }

    const post = new Post({
      user: session.user.id,
      images: imagesId
    })

    await post.save()

    return NextResponse.json({ message: 'ok', post }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'Error creating post' },
      { status: 500 }
    )
  }
}
