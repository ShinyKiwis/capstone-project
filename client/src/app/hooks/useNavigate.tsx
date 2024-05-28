"use client"
import { useRouter } from 'next/navigation'

const useNavigate = () => {
  const router = useRouter()

  const navigate = (path:string)  => {
    if (path === '../')
      router.back()
    else
      router.push(path)
  }

  return navigate
}

export default useNavigate