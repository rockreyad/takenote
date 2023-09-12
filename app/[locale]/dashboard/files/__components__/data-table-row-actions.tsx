'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { jsPDF } from 'jspdf';
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
import { FaFilePdf, FaFileWord } from 'react-icons/fa';
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const original = row.original as FileList;
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false); // Add state for rename dialog
  const [renamedFileName, setRenamedFileName] = useState(original.title); // Track renamed file name
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<string | null>(null);
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleCloseRenameDialog = () => {
    setIsRenameDialogOpen(false);
  };

  // async function downloadFile() {
  //   switch (downloadFormat) {
  //     case 'pdf':
  //       // Download as PDF
  //       console.log('Download as PDF');
  //       break;
  //     case 'docx':
  //       // Download as DOCX
  //       console.log('Download as DOCX');

  //       break;
  //     default:
  //       // Download as PDF
  //       break;
  //   }
  // }

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
          <DropdownMenuItem
            onClick={() => {
              setIsRenameDialogOpen(true); // Open rename dialog
            }}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDownloadModalOpen(true); // Open download modal
            }}
          >
            Download
          </DropdownMenuItem>
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
      {isRenameDialogOpen && original.id && (
        <RenameDialog
          onClose={handleCloseRenameDialog}
          file={{ id: original.id, name: original.title }}
          onRename={(newName) => setRenamedFileName(newName)} // Update UI with new name
        />
      )}
      {isDownloadModalOpen && (
        <DownloadModal
          file={{ id: original.id as string }}
          onClose={() => setIsDownloadModalOpen(false)}
          onDownload={(format) => setDownloadFormat(format)}
        />
      )}
      {/* Todo: */}
      {/* {downloadFormat && (
        // Implement the download logic based on the selected format
        <>{downloadFile()}</>
      )} */}
    </>
  );
}

const DownloadModal = ({
  file,
  onClose,
  onDownload
}: {
  file: {
    id: string;
  };
  onClose: () => void;
  onDownload: (format: string) => void;
}) => {
  const { toast } = useToast();
  const handleDownload = async (format: string) => {
    try {
      const res = await axios.get(`/api/file/download/${format}`, {
        params: {
          fileId: file.id
        },
        responseType: 'blob'
      });
      if (res.status === 200) {
        const blob = await res.data;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'document.docx';
        link.click();
        onDownload(format); // Pass the selected format back to the parent
        toast({
          title: 'File downloaded successfully',
          description: 'Your file has been downloaded',
          color: '#10B981'
        });
      } else {
        toast({
          title: 'An error occurred',
          description: 'Your file could not be downloaded',
          color: '#EF4444',
          about: res.statusText
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Your file could not be downloaded',
        color: '#EF4444',
        about: error as string
      });
    }
    onClose();
  };

  const handleDownloadPDF = async () => {
    const exportFileName = 'exportFile';

    try {
      const res = await axios.get('/api/file/download/content', {
          params: {
            fileId: file.id
          }
        });

      if (res.data.status === 200) {
        const content = res.data.content;

        const doc = await new jsPDF();
        doc.text(content, 10, 10);
        doc.save(exportFileName + '.pdf');
        
        toast({
          title: 'PDF downloaded successfully',
          description: 'PDF file has been downloaded',
          color: '#10B981'
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'PDF file could not be downloaded',
        color: '#EF4444',
        about: error as string
      });
    }
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Options</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Select a download format:</p>

          <div className="grid grid-flow-col gap-4">
            <Button
              variant="default"
              className="flex flex-col items-center gap-2 mt-2 h-auto"
              onClick={() => handleDownloadPDF()}
            >
              <FaFilePdf className="w-10 h-10" />
              <label className="uppercase">PDF</label>
            </Button>
            <Button
              variant="default"
              className="flex flex-col items-center gap-2 mt-2 h-auto"
              onClick={() => handleDownload('docx')}
            >
              <FaFileWord className="w-10 h-10" />
              <label className="uppercase">WORD</label>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

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
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    onClose();
    router.refresh();
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

const RenameDialog = ({
  onClose,
  file,
  onRename
}: {
  onClose: () => void;
  file: {
    id: string;
    name: string;
  };
  onRename: (newName: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  console.log('loading', loading);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [newName, setNewName] = useState(file.name); // Track the new name
  const { toast } = useToast();

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Perform renaming logic here
      const res = await axios.put('/api/file', {
        fileId: file.id,
        name: newName
      });
      setLoading(false);
      if (res.status === 200) {
        toast({
          title: 'File renamed successfully',
          description: 'Your file has been renamed'
        });
        // onRename(newName); // Update the UI with the new name
        router.refresh();
        handleClose();
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'An error occurred',
        description: 'Your file could not be renamed',
        color: '#EF4444',
        about: error as string
      });
    }
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
          <DialogDescription>
            Enter the new name for the file:
          </DialogDescription>
        </DialogHeader>
        <input
          type="text"
          value={newName}
          name="newName"
          onChange={(e) => setNewName(e.target.value)}
          className="border border-gray-300 px-2 py-1 mt-2 w-full rounded-md dark:bg-gray-800 dark:border-gray-700"
        />
        <input type="hidden" name="fileId" value={file.id} />
        <DialogFooter>
          <Button type="reset" variant={'outline'} onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant={'default'} onClick={handleSubmit}>
            {loading ? 'Renaming...' : 'Rename'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
