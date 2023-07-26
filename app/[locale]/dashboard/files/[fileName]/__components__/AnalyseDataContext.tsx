'use client';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import type { AnalyseData } from '@/types/analyseData';

interface AnalyseDataContext {
  data: AnalyseData | undefined;
  loading: boolean;
  isError: boolean;
  error: any;
}
const AnalyseDataContext = createContext<AnalyseDataContext | null>(null);

async function getTranscriptData(file_name: string): Promise<AnalyseData> {
  const res = await axios.post('https://capturia.io/api/v1/transcribe/file', {
    file_name
  });
  return res.data;
}

const AnalyseDataProvider = ({ ...props }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const fileName = searchParams?.get('fileName');
  const [data, setData] = useState<AnalyseData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!fileName) return;
      try {
        setLoading(true);
        const transcriptData = await getTranscriptData(fileName);
        setData(transcriptData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError(true);
        setError(error);
      }
    })();
  }, [fileName]);
  const value = {
    data,
    loading,
    isError,
    error
  };
  return <AnalyseDataContext.Provider value={value} {...props} />;
};

const useAnalyseData = () => {
  const context = useContext(AnalyseDataContext) as AnalyseDataContext;
  if (context === undefined) {
    throw new Error('useAnalyseData must be used within a AnalyseDataProvider');
  }
  return context;
};

export { AnalyseDataProvider, useAnalyseData };
