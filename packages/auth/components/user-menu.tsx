import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator, 
} from '@packages/design-system/components/ui/dropdown-menu';
import { Skeleton } from '@packages/design-system/components/ui/skeleton';
import { Button } from '@packages/design-system/components/ui/button';
import { authClient } from '@/client';
import Link from 'next/link';
import SignOutButton from './sign-out-button';

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className='h-9 w-24'/>
  }

  if (!session) {
    return (
      <Button variant={"outline"} asChild>
        <Link href='/login'>Sign In</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>{session.user.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-card'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}