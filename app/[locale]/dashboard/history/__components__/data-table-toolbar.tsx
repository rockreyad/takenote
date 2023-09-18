'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { statuses } from '../__data__/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <p>From:</p>
        <Input 
          type={'date'}
          className={'h-10 w-[150px] lg:w-[250px] focus-visible:ring-primary'}
          />
        <p>To:</p>
        <Input 
          type={'date'}
          className={'h-10 w-[150px] lg:w-[250px] focus-visible:ring-primary'}
        />
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
