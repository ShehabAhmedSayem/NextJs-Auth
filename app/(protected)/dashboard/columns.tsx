'use client';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import InviteApplicant from '@/components/forms/invite-applicant';
import { Badge } from '@/components/ui/badge';
import { USER_PROFILE_STATUS } from '@/lib/constants';
import { formatDateShortYear } from '@/lib/utils';
import { studentTableSchema } from '@/lib/validations/table-schema';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<studentTableSchema>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="text-sm font-medium hover:underline">{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.getValue('email')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'programName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Program Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('programName')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => {
      const startDate = formatDateShortYear(row.getValue('startDate'));
      return (
        <div className=" items-center">
          <span>{startDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => {
      const endDate = formatDateShortYear(row.getValue('endDate'));
      return (
        <div className="flex items-center">
          <span>{endDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const statusValue = row.getValue('status') as keyof typeof USER_PROFILE_STATUS;
      const statusType = USER_PROFILE_STATUS[statusValue];
      return (
        <div className="flex items-center">
          <Badge variant={statusType.colorVariant}>{statusType.badgeTitle}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'action',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
    cell: ({ row }) => {
      const statusValue = row.getValue('status');
      if (statusValue === 'approved_for_offer')
        return <InviteApplicant row={row} rowId={row.original?.id.toString()} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
