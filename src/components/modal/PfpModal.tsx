import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
/* 22.11.04 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';

import { Avatar, Radio, Select } from 'antd';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import TextButton from '@/components/button/TextButton';
import InfiniteLoader from '@/components/loader/InfiniteLoader';
import Empty from '@/components/empty/Empty';
import { NileApiService } from '@/services/nile/api';
import { profileImageData } from '../../../pages/mypage/profile';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { userProfileAtom } from '@/state/accountAtom';

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  value?: profileImageData;
  setValue?: (v: profileImageData) => void;
}

interface BasicProfile {
  value: number;
  type: string;
}

interface NftProfile {
  value: string;
  img: string;
}

const { Option } = Select;

const PfpModal = ({ isOpen, setIsOpen, value, setValue }: Props) => {
  /* 22.11.04 수정: useTranslation */
  const { t } = useTranslation(['mypage', 'common']);
  const api = NileApiService();

  const userProfile = useAtomValue(userProfileAtom);

  const [currentBasic, setCurrentBasic] = useState<number | undefined>(userProfile.themeIndex ?? 0);
  const [currentNft, setCurrentNft] = useState<string | undefined>(userProfile.img);

  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    api.mypage.nft.getList(userProfile.address ?? '', 1, 20)
      .then(({ data }) => setNftList(data))
      .catch((err) => {
        return null;
      })
  }, []);

  const basicProfile = useMemo(() => ([
    {
      value: 5,
      type: 'type5',
    },
    {
      value: 4,
      type: 'type4',
    },
    {
      value: 3,
      type: 'type3',
    },
    {
      value: 2,
      type: 'type2',
    },
    {
      value: 1,
      type: 'type1',
    },
    {
      value: 0,
      type: '',
    },
  ]), []);

  return (
    <ModalLayout
      wrapClassName="pfp-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="md"
      title={t('pfp.title')}
      footer
      destroyOnClose={true}
      footerContent={[
        <OutlineButton
          key="Cancel"
          buttonText={t('pfp.cancel')}
          color="black"
          size="md"
          onClick={() => {
            setIsOpen(false);
          }}
        />,
        <BgButton
          key="Apply"
          buttonText={t('pfp.apply')}
          color="black"
          size="md"
          onClick={() => {
            setIsOpen(false);
            setValue?.({
              img: currentNft,
              themeIndex: currentBasic,
            })
          }}
        />,
      ]}
    >
      <div className={cn('pfp-modal-inner')}>
        <div className={cn('title-wrap')}>
          <strong>{t('pfp.default')}</strong>
        </div>
        <Radio.Group
          onChange={(e) => {
            setCurrentNft(undefined);
            setCurrentBasic(e.target.value);
          }}
          value={currentBasic}
          className={cn('profile-list basic')}
        >
          {basicProfile.map((item: BasicProfile) => (
            <Radio.Button value={item.value} key={`basic-list-${item.value}`}>
              <Avatar className={cn('user-image', item.type)} style={{}} size={64}>
                <span className={cn('a11y')}>{t('pfp.profile')}</span>
              </Avatar>
            </Radio.Button>
          ))}
        </Radio.Group>
        <div className={cn('title-wrap')}>
          <strong>{nftList.length > 0 && nftList.length} Owned NFT</strong>
          {nftList.length > 0 && (
            <Select
              size="small"
              defaultValue="recently"
              suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
              popupClassName="select-size-sm-dropdown"
              maxTagCount={1}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <Option value="recently">{t('sorting.1')}</Option>
              <Option value="highest">{t('sorting.5')}</Option>
              <Option value="lowest">{t('sorting.6')}</Option>
            </Select>
          )}
        </div>
        {nftList.length > 0 ? (
          <>
            <Radio.Group
              onChange={(e) => {
                setCurrentBasic(undefined);
                setCurrentNft(e.target.value);
              }}
              value={currentNft}
              className={cn('profile-list nft')}
            >
              {nftList.map((item: NftProfile, index: number) => (
                <Radio.Button value={item.value} key={`nft-list-${index}`}>
                  <span className={cn('img-wrap')}>
                    <Image src={item?.img} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                  </span>
                </Radio.Button>
              ))}
            </Radio.Group>
            <InfiniteLoader />
          </>
        ) : (
          <Empty
            subText={t('pfp.empty1')}
            button={<TextButton buttonText={t('pfp.empty2')} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
          />
        )}
      </div>
    </ModalLayout>
  );
};

export default PfpModal;
