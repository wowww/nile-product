import QRCode from 'qrcode.react';
import { useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';

export type WemixAuthProps = {
  requestId: string;
};

export const WemixAuth = ({ requestId }: WemixAuthProps) => {
  const requestUrl = useMemo(
    () => `wemix://wallet?requestId=${requestId}`,
    [requestId],
  );

  useEffect(() => {
    if (isMobile && requestId) {
      setTimeout(() => window.open(requestUrl));
    }
  }, [requestId, requestUrl]);

  return (
    <QRCode
      value={requestUrl}
      imageSettings={{
        width: 32,
        height: 32,
        excavate: true,
        src: 'https://file.mir4global.com/nile/resources/logo.svg',
      }}
    />
  );
};
