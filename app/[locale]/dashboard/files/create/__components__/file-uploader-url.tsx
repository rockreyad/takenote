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
import { useToast } from '@/components/ui/use-toast';
import useYoutubeUpload from '@/hook/useYoutubeUpload';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MouseEvent, useEffect, useState } from 'react';
import Loading from '../../[id]/loading';
import { validateYouTubeUrl } from '@/lib/utils';

export default function FileUploaderURLDialog(props: { buttonName: string }) {
  const [url, setUrl] = useState<string>('');
  const { upload, uploadProgress, uploadStatus } = useYoutubeUpload();
  const { toast } = useToast();

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const isYoutubeUrl = validateYouTubeUrl(url);
    if (!isYoutubeUrl) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid youtube url'
      });
      setUrl('');
      return;
    }
    await upload(url);
  };

  useEffect(() => {
    // console.log('progress', uploadProgress);
    if (uploadProgress === 100) {
      // console.log('upload complete');
    }
  }, [uploadProgress]);

  //Show upload progress on the dialog
  if (uploadStatus === 'uploading') {
    return <Loading />;
  }

  // if (uploadStatus === 'completed') {
  //   return <div>Upload complete</div>;
  // }

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
          <Textarea
            id="name"
            className="col-span-3"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <DialogFooter>
          <Button
            className="flex mx-auto items-center justify-center bg-primary py-4 rounded-sm text-white uppercase tracking-widest cursor-pointer transition-all w-full"
            onClick={
              url
                ? handleSubmit
                : () => {
                    toast({
                      title: 'Url is empty!',
                      description: 'Please enter a url to continue'
                    });
                  }
            }
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
