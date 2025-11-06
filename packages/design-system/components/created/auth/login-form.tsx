'use client';
import { authClient } from '@packages/auth/client';
import { LoginSchema } from '@packages/auth/lib/schemas/login-schema';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import Loader from '@packages/design-system/components/shared/loader';
import { Button } from '@packages/design-system/components/ui/button';
import { Label } from '@packages/design-system/components/ui/label';
import { Input } from '@packages/design-system/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@packages/design-system/components/ui/card';


export default function LoginForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password
        },
        {
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText)
          },
          onSuccess: () => {
            router.push('/dashboard');
            toast.success("Sign in successful!")
          } 
        }
      )
    }
  });

  if (isPending) {
    return <Loader />
  }

  return (
    <Card className='mx-auto w-full mt-10 max-w-md p-6'>
      <CardHeader>
         <CardTitle className='mb-6 text-center text-3xl font-bold'>
            <h1>
              Welcome Back
            </h1>
          </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className='space-y-4'
        >
          <div>
            <form.Field name='email'>
              {(field) => (
                <div className='space-y-2'>
                  <Label htmlFor={field.name}>Email</Label>
                  <Input 
                    id={field.name} 
                    name={field.name}
                    type='email'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error?.message} className='text-red-500'>
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

          
				<div>
					<form.Field name="password">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Password</Label>
								<Input
									id={field.name}
									name={field.name}
									type="password"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors.map((error) => (
									<p key={error?.message} className="text-red-500">
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
				</div>

          <form.Subscribe>
            {(state) => (
              <Button
                type='submit'
                className='w-full'
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Submitting..." : "Sign In"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
      <CardFooter className="mt-4 text-center">
        <Button
          variant={"link"}
          onClick={onSwitchToSignUp}
          className='text-indigo-600 hover:text-indigo-800'
        >
          Need an account? Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
}