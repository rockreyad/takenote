'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Transcription } from '@/server/zodSchema/transcribe';

interface AnalyseDataContext {
  data: Transcription | undefined;
  loading: boolean;
  isError: boolean;
  error: any;
}
const AnalyseDataContext = createContext<AnalyseDataContext | null>(null);

async function getTranscriptData(idOrHandle: string): Promise<Transcription> {
  const res = await axios
    .get(`/api/file/transcribe?idOrHandle=${idOrHandle}`, {
      timeout: 1000 * 60 * 12
    })
    .catch((error) => {
      throw error;
    });
  const { data } = res.data;
  return data;
}

const AnalyseDataProvider = ({
  idOrHandle,
  ...props
}: {
  idOrHandle: string;
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<Transcription>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!idOrHandle) return;
      try {
        setLoading(true);
        const transcriptData = await getTranscriptData(idOrHandle);
        setData(transcriptData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError(true);
        setError(error);
      }
    })();
  }, [idOrHandle]);
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
