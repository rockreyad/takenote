'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { statuses } from '../__data__/data';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
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
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order #" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('id')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'placed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('status')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'placed_by',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed by" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('status')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('status')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('status')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('status')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'cost',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        {row.getValue('status')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
