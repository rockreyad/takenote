'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { statuses } from '../__data__/data';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import moment from 'moment';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FileList, File_Status } from '@/server/zodSchema/file';

export const columns: ColumnDef<FileList>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'create_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        {moment(row.getValue('create_at')).format('LL')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Name" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);
      const originalStatus = row.original.status;
      const status = statuses.find((status) => status.value === originalStatus);

      return (
        <div className="flex space-x-2">
          {/* {label && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">
                    {label.icon && (
                      <label.icon className="h-4 w-4 text-primary" />
                    )}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{label.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}
          {status && status.value === File_Status.enum.IN_PROGRESS ? (
            <p className="max-w-[500px] truncate font-medium opacity-50">
              {row.getValue('title')}
            </p>
          ) : status && status.value == File_Status.enum.COMPLETE ? (
            <Link
              href={`/dashboard/files/${row.original.handle}`}
              className="max-w-[500px] truncate font-medium hover:underline"
            >
              {row.getValue('title')}
            </Link>
          ) : (
            <p className="max-w-[500px] truncate font-medium opacity-50">
              {row.getValue('title')}
            </p>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon
              className={cn('mr-2 h-4 w-4', {
                'text-blue-700/60':
                  status.value === File_Status.enum.IN_PROGRESS,
                'text-green-700/60': status.value === File_Status.enum.COMPLETE,
                'text-red-700/60': status.value === File_Status.enum.ERROR
              })}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
