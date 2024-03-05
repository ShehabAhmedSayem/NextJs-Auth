'use client';

import { DataTable } from '@/components/data-table/data-table';
import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getApplicantList } from '@/services/api-services';
import { TailSpin } from '@/icons';

type dataType = {
  id: string;
  name: string;
  email: string;
  programName: string;
  startDate: string;
  endDate: string;
  status: string;
}[];

const StudentList = () => {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<dataType>([]);

  const fetchApplicantsList = async () => {
    setLoading(true);
    try {
      const {
        data: { results }
      } = await getApplicantList();
      setApplicants(results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsList();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-semibold">Students</h1>
      <div className="mt-6 rounded-2xl border border-neutral-300 bg-neutral p-6 shadow">
        <Tabs defaultValue="applicants" className="">
          <TabsList className="grid w-full max-w-[300px] grid-cols-3">
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="alumnus">Alumnus </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-6">
          {loading ? (
            <div className="m-auto my-40 w-max">
              <TailSpin className="text-[120px] text-neutral-400" />
            </div>
          ) : (
            <DataTable data={applicants} columns={columns} />
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentList;
