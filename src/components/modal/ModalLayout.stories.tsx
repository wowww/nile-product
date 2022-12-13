import { ComponentMeta, ComponentStory } from '@storybook/react';
import BgButton from '../button/BgButton';
import OutlineButton from '../button/OutlineButton';
import ModalLayout from './ModalLayout';
import { useState } from 'react';
import BuyResultModal from './BuyResultModal';
import { nftCardData } from '../marketplace/cardData';

export default {
  title: 'Modal/ModalLayout',
  component: ModalLayout,
  parameters: {
    componentSubtitle: 'Small Size Popup',
    // antd 모달에서 footer의 컴포넌트 배열을 넘기는데 스토리북에서 Error: Evaluation failed: TypeError: Cannot convert a Symbol value to a string 노출
    // https://github.com/storybookjs/storybook/issues/11554
    docs: {
      source: {
        code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
      },
    },
  },
  argTypes: {},
} as ComponentMeta<typeof ModalLayout>;

export const Default: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="결제 실패 : 잔액 부족 시"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setActive(!active);
            }}
          />,
        ]}
      />
    </>
  );
};

export const Second: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="결제 실패 : 다른 사용자가 먼저 결제 시"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setActive(!active);
            }}
          />,
        ]}
      />
    </>
  );
};

export const Third: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="변경 확인 팝업"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <OutlineButton
            buttonText="Cancel"
            color="black"
            size="md"
            key="Cancel"
            onClick={() => {
              setActive(!active);
            }}
          />,
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setActive(!active);
            }}
          />,
        ]}
      />
    </>
  );
};

export const Fourth: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="취소 확인 팝업"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <OutlineButton
            buttonText="Back"
            color="black"
            size="md"
            key="Back"
            onClick={() => {
              setActive(!active);
            }}
          />,
          <BgButton
            buttonText="Yes, Cancel"
            color="black"
            size="md"
            key="Yes"
            onClick={() => {
              setActive(!active);
            }}
          />,
        ]}
      />
    </>
  );
};
export const Fifth: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  const [isModalSm5, setModalSm5] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="미판매 상태로 변경"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="OK"
            onClick={() => {
              setModalSm5(false);
            }}
          />,
        ]}
      />
    </>
  );
};

export const Sixth: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="Open for Offers 상태로 변경"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="Back"
            onClick={() => {
              setActive(!active);
            }}
          />,
        ]}
      />
    </>
  );
};

export const Seventh: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="판매 알림 신청"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <ModalLayout
        {...args}
        isOpen={active}
        setIsOpen={setActive}
        footerContent={[
          <OutlineButton
            buttonText="Cancel"
            color="black"
            size="md"
            key="Cancel"
            onClick={() => {
              setActive(!active);
            }}
          />,
          <BgButton
            buttonText="Save"
            color="black"
            size="md"
            key="Back"
            onClick={() => {
              setActive(!active);
            }}
          />,
        ]}
      />
    </>
  );
};
export const Eighth: ComponentStory<typeof ModalLayout> = (args) => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  return (
    <>
      <OutlineButton
        buttonText="거래 성공 팝업"
        color="black"
        size="md"
        onClick={() => {
          setActive(!active);
        }}
      />
      <BuyResultModal
        isOpen={active}
        setIsOpen={setActive}
        resultCase="auctionSuccess"
        userName="user_name"
        buyer="buyer"
        seller="seller"
        price={1440}
        imgUrl={nftCardData[0].imgUrl}
      />
      <OutlineButton
        buttonText="거래 실패 팝업"
        color="black"
        size="md"
        onClick={() => {
          setActive2(!active);
        }}
      />
      {/* 성공 실패 팝업 */}
      <BuyResultModal
        isOpen={active2}
        setIsOpen={setActive2}
        resultCase="auctionFail"
        userName="user_name"
        buyer="buyer"
        seller="seller"
        price={1440}
        imgUrl={nftCardData[0].imgUrl}
      />
    </>
  );
};

Default.args = {
  size: 'sm',
  title: '결제 실패',
  footer: true,
  children: <p>잔액이 부족합니다.</p>,
};

Second.args = {
  size: 'sm',
  title: '결제 실패',
  footer: true,
  children: <p>해당 NFT가 Sold out 되었습니다.</p>,
};

Third.args = {
  size: 'sm',
  title: '판매 변경 확인',
  footer: true,
  children: (
    <p>
      판매 방식 및 조건을 변경하시겠습니까?
      <br />재 Listing 시 Gas Fee가 발생합니다.
    </p>
  ),
};

Fourth.args = {
  size: 'sm',
  title: '판매 취소 확인',
  footer: true,
  children: (
    <p>
      판매를 취소하시겠습니까?
      <br />
      Listing 취소 시 Gas Fee가 발생합니다.
    </p>
  ),
};
Fifth.args = {
  size: 'sm',
  title: 'Not for Sale',
  footer: true,
  children: (
    <p>
      해당 NFT가 미판매 상태로 변경되었습니다.
      <br />
      다른 이용자들의 가격 제안을 받을 수 없습니다.
    </p>
  ),
};
Sixth.args = {
  size: 'sm',
  title: 'Open for Offer',
  footer: true,
  children: (
    <p>
      해당 NFT가 가격 제안을 받을 수 있는 상태로 변경되었습니다.
      <br />
      지금부터 다른 이용자들이 자유롭게 가격을 제안할 수 있습니다.
    </p>
  ),
};
Seventh.args = {
  size: 'sm',
  title: '판매 알림 신청',
  footer: true,
  children: (
    <p>
      해당 NFT가 가격 제안을 받을 수 있는 상태로 변경되었습니다.
      <br />
      지금부터 다른 이용자들이 자유롭게 가격을 제안할 수 있습니다.
    </p>
  ),
};

Eighth.args = {
  size: 'sm',
  title: '판매 알림 신청',
  footer: true,
  children: (
    <p>
      해당 NFT가 가격 제안을 받을 수 있는 상태로 변경되었습니다.
      <br />
      지금부터 다른 이용자들이 자유롭게 가격을 제안할 수 있습니다.
    </p>
  ),
};
