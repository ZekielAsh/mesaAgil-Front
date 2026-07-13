import { downloadStatsReport } from '@/service/statsService';
import { Period } from '@/types/StatsResponses';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function useDownloadStatsReport() {
  const { user } = useAuth();

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState('');

  const downloadReport = (period: Period) => {
    setIsDownloading(true);
    setDownloadErrorMessage('');

    downloadStatsReport(
      period,
      user?.token ?? ''
    )
    .then(response => {
        saveBlob(
            response.data,
            `estadisticas-${period}.pdf`
        );
    })
    .catch(error => {
        setDownloadErrorMessage(error.message);
    })
    .finally(() => {
        setIsDownloading(false);
    });
  };

  return {
    downloadReport,
    isDownloading,
    downloadErrorMessage,
  };
}