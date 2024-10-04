import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Love from '@/models/Love'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const session = await auth()
    const { postId } = params

    console.log(postId)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const userLove = await Love.findOneAndDelete({
      user: session.user.id,
      post: postId
    })

    if (userLove) {
      return NextResponse.json(
        { message: 'Love removed successfully' },
        { status: 200 }
      )
    }

    const newLove = await Love.create({
      post: postId,
      user: session.user.id
    })

    return NextResponse.json({ message: 'Loved successfully' }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: 'Error loving post' }, { status: 500 })
  }
}
