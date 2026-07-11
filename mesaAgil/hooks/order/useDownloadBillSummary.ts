import { downloadBillSummary } from '@/service/orderService';
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

export function useDownloadBillSummary() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState('');

  const download = (orderId: number) => {
    setIsDownloading(true);
    setDownloadErrorMessage('');

    downloadBillSummary(orderId)
      .then(response => {
        saveBlob(
          response.data,
          `resumen-cuenta-${orderId}.pdf`
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
    download,
    isDownloading,
    downloadErrorMessage
  };
}