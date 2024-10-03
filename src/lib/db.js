import User from '@/models/User'
import { connect } from 'mongoose'
const { MONGODB_URI } = process.env

export default async function connectDB() {
  try {
    await connect(MONGODB_URI)
  } catch (error) {
    console.error('ERROR connect to mognodb: ', error.message)
    process.exit(1)
  }
}

export const getUserByNickOrEmail = async (nick, email) => {
  try {
    const user = await User.findOne({ $or: [{ email }, { nick }] })
    return user
  } catch {
    return null
  }
}

export const getUserByNick = async (nick) => {
  try {
    const user = await User.findOne({ nick })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id })
    return user
  } catch {
    return null
  }
}
