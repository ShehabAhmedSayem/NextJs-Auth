'use client';

import { Row } from '@tanstack/react-table';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { postInviteApplicant } from '@/services/api-services';
import { InviteApplicantSchema } from '@/lib/validations/user';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InviteActionsProps<TData> {
  row: Row<TData>;
  rowId: string;
}

type InviteApplicant = z.infer<typeof InviteApplicantSchema>;

function InviteApplicant<TData>({ row, rowId }: InviteActionsProps<TData>) {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    setLoading(true);
    try {
      const data: InviteApplicant = {
        email: row.getValue('email'),
        applicantId: rowId
      };
      if (data) {
        const res = await postInviteApplicant(data);
        if (res.status === 200) {
          setDisabled(true);
          toast({
            title: 'Success!',
            description: 'Your invitation has been sent.',
            variant: 'success'
          });
        }
      }
    } catch (e) {
      toast({
        title: 'Oops! Something went wrong.',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center">
        <Button
          disabled={disabled}
          onClick={handleInvite}
          variant="outline"
          className="h-8 min-w-24 px-3 py-1"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Invite'
          )}
        </Button>
      </div>
    </div>
  );
}

export default InviteApplicant;
