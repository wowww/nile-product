import styled from '@emotion/styled';
import { Button } from 'antd';
import { Modal } from '@components/modal';
import { WemixAuth } from '@components/wemix';
import { useAtom } from 'jotai';
import { wemixCommonModalAtom } from '@/state/modalAtom';

export type LoginProps = {
  // TODO
};

export const Login = (props: LoginProps) => {
  const [commonModal, setCommonModal] = useAtom(wemixCommonModalAtom);

  return (
    <>
      <Container>
        <Wrapper>
          <Button>Metamask</Button>
        </Wrapper>
      </Container>
      <Modal
        open={commonModal.open}
        onClose={() => {
          setCommonModal((prev) => ({ ...prev, open: false }));
        }}
      >
        <WemixAuth requestId={commonModal.requestId} />
      </Modal>
    </>
  );
};

const Container = styled.div``;
const Wrapper = styled.div`
  & > * {
    margin: 8px;
  }
`;
