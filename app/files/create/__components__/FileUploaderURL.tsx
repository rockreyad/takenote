import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function FileUploaderURLDialog(props: { buttonName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex mx-auto items-center justify-center bg-primary py-4 rounded-sm text-white uppercase tracking-widest cursor-pointer transition-all w-full">
          {props.buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize font-semibold tracking-wider">
            {props.buttonName}
          </DialogTitle>
          <DialogDescription>
            Please enter urls (only one url is allowed)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name" className="text-left text-black/40">
            Files supported: .mov, .mp4, .mp3, .wav, .m4a
          </Label>
          <Textarea id="name" className="col-span-3" />
        </div>
        <DialogFooter>
          <Button
            className="flex mx-auto items-center justify-center bg-primary py-4 rounded-sm text-white uppercase tracking-widest cursor-pointer transition-all w-full"
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
