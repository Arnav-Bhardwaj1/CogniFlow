import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-800 flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Image src="/logos/logo.svg" alt="CogniFlow" width={70} height={100} />
          <div style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>
          <h1> CogniFlow</h1>
          </div>
        </Link>
      </div>
      {children}
      </div>
  )
}

export default AuthLayout
