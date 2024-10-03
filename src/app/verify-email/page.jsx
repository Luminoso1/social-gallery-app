import { verifyEmailToken } from '@/lib/verification/verify'
import React from 'react'

export default async function VerifyEmailPage({ searchParams }) {
  const { token } = searchParams

  console.log(token);

  const result = await verifyEmailToken(token)
  if (result.error) {
    return <p>{result.error}</p>
  }
  return <p>{result.success}</p>
}
