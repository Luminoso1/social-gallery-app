import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Follow from '@/models/Follow'
import Love from '@/models/Love'
import Post from '@/models/Post'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const session = await auth()
    const { id } = params

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()

    const userDb = await User.findOne({ _id: id })
      .select('_id nick email image createdAt')
      .exec()

    if (!userDb) {
      return NextResponse.json(
        { message: `User with id: ${id} not found` },
        { status: 400 }
      )
    }

    const postCount = await Post.countDocuments({ user: userDb._id })

    const loveCount = await Love.countDocuments({
      post: { $in: await Post.find({ user: userDb._id }) }
    })

    const followersCount = await Follow.countDocuments({
      userFollowed: userDb._id
    })

    const followingCount = await Follow.countDocuments({
      userFollowing: userDb._id
    })

    if (session.user.id === userDb._id.toString()) {
      return NextResponse.json(
        {
          user: {
            id: userDb._id,
            nick: userDb.nick,
            email: userDb.email,
            avatar: userDb.image,
            isActive: userDb.isActive,
            isEmailVerified: userDb.isEmailVerified,
            createdAt: userDb.createdAt
          },
          counts: {
            posts: postCount,
            loves: loveCount,
            followers: followersCount,
            following: followingCount
          }
        },
        { status: 200 }
      )
    }

    const followInfo = await Follow.findOne({ userFollowing: session.user.id })

    return NextResponse.json(
      {
        user: {
          id: userDb._id,
          nick: userDb.nick,
          email: userDb.email,
          avatar: userDb.image,
          isActive: userDb.isActive,
          isEmailVerified: userDb.isEmailVerified,
          createdAt: userDb.createdAt
        },
        counts: {
          posts: postCount,
          loves: loveCount,
          followers: followersCount,
          following: followingCount
        },
        follow: followInfo ? true : false
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: 'Error getting post' }, { status: 500 })
  }
}
