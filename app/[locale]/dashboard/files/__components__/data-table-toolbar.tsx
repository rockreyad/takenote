'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { statuses } from '../__data__/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [searchValue, setSearchValue] = useState((table.getColumn('title')?.getFilterValue() as string) ?? '')
  const searchParams = useSearchParams()

  useEffect(() => {
 
    const search = searchParams.get('query')
    
    if (search && table.getColumn('title')?.getFilterValue() as string !== search) {
      table.getColumn('title')?.setFilterValue(search)
    }
  }, [])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter File Name..."
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value)
            table.getColumn('title')?.setFilterValue(event.target.value)
          }}
          className="h-10 w-[150px] lg:w-[250px] focus-visible:ring-primary"
        />
      {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setSearchValue('')
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
