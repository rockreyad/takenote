import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function FileUploaderURLDialog(props: { buttonName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex mx-auto items-center justify-center bg-indigo-600 py-4 rounded-sm text-white uppercase tracking-widest cursor-pointer hover:bg-indigo-700 transition-all w-full">
          {props.buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* <DialogHeader>
          <DialogTitle>{props.buttonName}</DialogTitle>
          <DialogDescription>
            Please enter urls (only one url is allowed)
          </DialogDescription>
        </DialogHeader> */}
        <div className="grid gap-4 py-4">
          <Label htmlFor="name" className="text-left">
            URL
          </Label>
          <Textarea id="name" className="col-span-3" />
        </div>
        <DialogFooter>
          <Button
            className="flex mx-auto items-center justify-center bg-indigo-600 py-4 rounded-sm text-white uppercase tracking-widest cursor-pointer hover:bg-indigo-700 transition-all"
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
