'use client'
import { authClient } from '@/client';
import { useForm } from '@tanstack/react-form';
import { RegisterSchema } from '@/schemas/register-schema';
import { toast } from 'sonner';
import Loader from '@packages/design-system/components/loader';
import { Button } from '@packages/design-system/components/ui/button';
import { Input } from '@packages/design-system/components/ui/input';
import { Label } from '@packages/design-system/components/ui/label';
import { useRouter } from 'next/navigation';
import { 
	Card, 
	CardHeader, 
	CardContent, 
	CardFooter, 
	CardTitle 
} from '@packages/design-system/components/ui/card';

export default function RegisterForm({
  onSwitchToSignInAction,
}: {
  onSwitchToSignInAction: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    validators: {
      onSubmit: RegisterSchema
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText)
          },
          onSuccess: () => {
            router.push('/dashboard');
            toast.success("Sign up successful");
          }
        }
      )
    }
  });

  if (isPending) {
    return <Loader/>;
  }

  return (
    <Card className="mx-auto w-full mt-10 max-w-md p-6">
      <CardHeader>
        <CardTitle className="mb-6 text-center text-3xl font-bold">
          <h1>
            Create Account
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
				className="space-y-4"
			>
				<div>
					<form.Field name="name">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Name</Label>
								<Input
									id={field.name}
									name={field.name}
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

				<div>
					<form.Field name="email">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Email</Label>
								<Input
									id={field.name}
									name={field.name}
									type="email"
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
							type="submit"
							className="w-full"
							disabled={!state.canSubmit || state.isSubmitting}
						>
							{state.isSubmitting ? "Submitting..." : "Sign Up"}
						</Button>
					)}
				</form.Subscribe>
			</form>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={onSwitchToSignInAction}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Already have an account? Sign In
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}