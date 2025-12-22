import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const page = async () => {
  await requireAuth()
  return (
    <div>
      <p>Workflows Page</p>
    </div>
  )
}

export default page
