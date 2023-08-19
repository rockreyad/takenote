'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FileList } from '@/server/zodSchema/file';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const original = row.original as FileList;
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              if (original.id) {
                router.push(`/dashboard/files/${original.id}`);
              }
            }}
          >
            Open
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Share</DropdownMenuItem>
          <DropdownMenuItem disabled>Rename</DropdownMenuItem>
          <DropdownMenuItem disabled>Download</DropdownMenuItem>
          <DropdownMenuItem disabled={true}>Rebuild</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
            <DropdownMenuShortcut>
              <Trash className="w-4 h-4 ml-2" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleteDialogOpen && original.id && original.title && (
        <DeleteDialog
          onClose={handleCloseDeleteDialog}
          file={{ id: original.id, name: original.title }}
        />
      )}
    </>
  );
}

const DeleteDialog = ({
  onClose,
  file
}: {
  onClose: () => void;
  file: {
    id: string;
    name: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.delete('/api/file/', {
        data: {
          fileId: file.id
        },
        method: 'DELETE'
      });

      if (res.status === 200) {
        toast({
          title: 'File deleted successfully',
          description: 'Your file has been deleted from the cloud'
        });
        handleClose();
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Your file could not be deleted',
        color: '#EF4444',
        about: error as string
      });
    }
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete
            <i className="mx-1 font-medium dark:text-white">{file.name}</i>
            and remove this file data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="reset" variant={'outline'} onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant={'destructive'} onClick={handleSubmit}>
            Delete this file
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
