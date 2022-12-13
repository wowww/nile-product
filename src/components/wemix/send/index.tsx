import { useCallback } from 'react';
import { Modal } from '@components/modal';
import { WemixAuth } from '@components/wemix';
import styled from '@emotion/styled';
import { wemixCommonModalAtom } from '@/state/modalAtom';
import { useAtom } from 'jotai';

export type WemixSendProps = {
  to: string;
  value: number;
};

export const WemixSend = ({ to, value }: WemixSendProps) => {
  // const { sendTransaction } = useMetamaskSDK();
  const [commonModal, setCommonModal] = useAtom(wemixCommonModalAtom);
  // const wallet = useRecoilValue(CryptoWallet);

  // const handleSendViaMetamask = useCallback(() => {
    // sendTransaction(to, value);
  // }, [sendTransaction, to, value]);

  const onSuccess = useCallback(() => {
    // TODO
  }, []);

  const onError = useCallback(() => {
    // TODO
  }, []);

  // const handleSendViaWemix = useCallback(() => {
  //   const transaction = SendWemix({ to, value });
  //   propose({ transaction, onSuccess, onError });
  // }, [SendWemix, onError, onSuccess, propose, to, value]);

  // const handleSend = useCallback(() => {
    // switch (wallet.method) {
    //   case 'metamask':
    //     handleSendViaMetamask();
    //     break;
    //   case 'wemix':
    //     handleSendViaWemix();
    //     break;
    //   default:
    //     break;
    // }
  // }, [handleSendViaMetamask, handleSendViaWemix, wallet]);

  return (
    <Container>
      <Wrapper>
        {/* <Button onClick={handleSend}>Send via {wallet.method}: {value}</Button> */}
      </Wrapper>
      <Modal
        open={commonModal.open}
        onClose={() => {
          setCommonModal((prev) => ({ ...prev, open: false }));
        }}
      >
        <WemixAuth requestId={commonModal.requestId} />
      </Modal>
    </Container>
  );
};

const Container = styled.div([]);

const Wrapper = styled.div`
  & > * {
    margin: 8px;
  }
`;
