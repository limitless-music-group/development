'use client'
import { Button } from '../../ui/button';
import { authClient } from '@packages/auth/client';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export default function SignOutButton() {
	const router = useRouter();

  return (
    <Button 
      variant={"destructive"} 
      className='w-full' 
      onClick={() => {
        authClient.signOut({
          fetchOptions: {
            onError: (error) => {
              toast.error(error.error.message || error.error.statusText)
            },
            onSuccess: () => {
              router.push('/login');
            }
          }
        })
    }}>
      Sign out
    </Button>
  )
}