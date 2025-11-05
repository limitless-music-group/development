import { Icons } from './icons';

export default function Loader() {
  return (
		<div className="flex h-full items-center justify-center pt-8">
			<Icons.loader className="animate-spin" />
		</div>
  )
}