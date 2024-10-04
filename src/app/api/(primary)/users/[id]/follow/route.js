import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Follow from '@/models/Follow'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const session = await auth()
    const { id } = params
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (id === session.user.id) {
      return NextResponse.json(
        { message: 'Oops you cant chase your tail' },
        { status: 400 }
      )
    }

    await connectDB()

    const follow = await Follow.findOneAndDelete({
      userFollowed: id,
      userFollowing: session.user.id
    })

    if (follow) {
      return NextResponse.json(
        { message: 'Follow removed successfully' },
        { status: 200 }
      )
    }

    const newFollow = await Follow.create({
      userFollowed: id,
      userFollowing: session.user.id
    })

    return NextResponse.json(
      { message: 'Follow successfully', newFollow },
      { status: 200 }
    )
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: 'Error following user' }, { status: 500 })
  }
}
