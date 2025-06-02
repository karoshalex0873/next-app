'use client'

import { Button } from "@/components/ui/button"
import { getLoggedInUser } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

const RootLayout = ({ children }: { children: ReactNode }) => {

  const router = useRouter()
  const [Loading, setLoading] = useState(true)


  useEffect(() => {
    const checkUser = async () => {
      const user = await getLoggedInUser()

      if (!user) {
        router.push('/sign-in')
      } else {
        router.push('/')
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  if (Loading) return null

  // fuction to handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      if (res.ok) {
        router.push('/sign-in')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('An error occurred during logout:', error)
    }
  }

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2" >
          <Image src='/logo.svg' alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        <Button
          onClick={handleLogout}
          className='bg-primary-100 max-sm:w-fit  cursor-pointer'>
          Logout
        </Button>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout
