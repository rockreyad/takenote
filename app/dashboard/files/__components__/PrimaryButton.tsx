import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrimaryButton(props: { buttonName: string }) {
  return (
    <Link href="/files/create">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/80 text-sm lg:text-lg px-2 lg:px-4 lg:py-8 font-medium uppercase tracking-wider"
      >
        {props.buttonName}
      </Button>
    </Link>
  );
}
