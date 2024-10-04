import { auth } from '@/auth'
import connectDB, { getUserByNickOrEmail } from '@/lib/db'
import Love from '@/models/Love'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()

    // const user = await getUserByNickOrEmail(
    //   session.user.nick,
    //   session.user.email
    // )

    // if (!user) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    // }

    const posts = await Post.find()
      .populate({
        path: 'user',
        select: '_id nick email image'
      })
      .populate({
        path: 'images',
        select: '_id photoUrl title date country city description'
      })
      .sort({ createdAt: -1 })
      .exec()

    const formated = await Promise.all(
      posts.map(async (post) => {
        const loveCountPost = await Love.countDocuments({ post: post._id })

        const isCurrentUserLove = await Love.findOne({
          user: session.user.id,
          post: post._id
        })

        return {
          id: post._id,
          loves: loveCountPost,
          currentUserLove: isCurrentUserLove ? true : false,
          user: post.user
            ? {
                id: post.user._id,
                nick: post.user.nick,
                email: post.user.email,
                avatar: post.user.image
              }
            : null,
          photos: post.images.map((photo) => ({
            id: photo._id,
            photoUrl: photo.photoUrl,
            title: photo.title,
            date: photo.date,
            country: photo.country,
            city: photo.city,
            description: photo.description
          }))
        }
      })
    )

    return NextResponse.json({ posts: formated }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error getting post' }, { status: 500 })
  }
}
