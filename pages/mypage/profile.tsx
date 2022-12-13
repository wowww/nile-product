import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Avatar, Form, Input, Radio } from 'antd';
import { useRecoilValue } from 'recoil';
import { windowResizeAtom } from '@/state/windowAtom';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';

import PfpModal from '@/components/modal/PfpModal';
import ContentTitle from '@/components/marketplace/ContentTitle';

import ModalLayout from '@/components/modal/ModalLayout';
import { NileApiService } from '@/services/nile/api';
import { GetServerSideProps } from 'next';
import { userProfileAtom } from '@/state/accountAtom';
import { useAtomValue } from 'jotai';
import {NileNftToken} from "@/models/nile/marketplace/NileNft";

export type profileImageData = {
  img?: string;
  themeIndex?: number;
  item?: NileNftToken;
};

const Profile = ({item}: profileImageData) => {
  const router = useRouter();

  const { t } = useTranslation(['mypage', 'common']);
  const api = NileApiService();

  // TODO : SNS CONNECT
  const [instagramToken, setInstagramToken] = useState<string>();
  const [instagramName, setInstagramName] = useState<string>();
  const [connectTwitter, setConnectTwitter] = useState(true);
  const [connectInsta, setConnectInsta] = useState(false);

  const offset = useAtomValue(windowResizeAtom);
  const [pfpModal, setPfpModal] = useState(false);

  const [isConfirmModal, setConfirmModal] = useState(false);

  const [form] = Form.useForm();

  const userInfo = useAtomValue(userProfileAtom);

  const [profileImg, setProfileImg] = useState<profileImageData>({
    img: userInfo.img ?? '',
    themeIndex: userInfo.themeIndex ?? 0,
  });

  useEffect(() => {
    form.setFieldsValue({
      nickname: userInfo.nickname,
      description: userInfo.description,
      url: userInfo.snsLinks?.at(0)?.link,
      displayAsset: (userInfo.displayAsset ?? 'public').toLowerCase(),
    });
  }, [form, userInfo]);

  const onFinish = (values: any) => {
    api.user.account
      .updateUserInfo(userInfo.id ?? '', {
        nickname: values.nickname,
        description: values.description,
        url: values.url,
        displayAsset: values.displayAsset,
        ...profileImg,
      })
      .then(({ data }) => {
        router.push('/mypage');
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const validateNickname = useCallback((_: any, value: string) => {
    if (!value || value.length > 45) {
      return Promise.reject(new Error(t('profileSetting.userNameValidCount')));
    }
    const nicknameValid = /^[0-9|a-z|A-Z|\-|_]*$/i;
    if (!nicknameValid.test(value)) {
      return Promise.reject(new Error(t('profileSetting.userNameValidNotAllowed')));
    }

    api.user.account
      .validNickName(value)
      .then((res) => {
        if (!res.data.results) {
          return Promise.reject(new Error(t('profileSetting.userNameValidAlreadyUse')));
        }
      })
      .catch((err) => console.log(err));

    return Promise.resolve();
  }, []);

  const validateUrl = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.resolve();
    }
    if (!value.startsWith('https://')) {
      return Promise.reject(new Error('url have to start with https://'));
    }

    return Promise.resolve();
  }, []);

  {
    /* TODO: 11/17 이후 반영 - sns connect */
  }
  // useEffect(() => {
  //   if (query.code) {
  //     axios
  //       .post('https://localhost:3001/api/instagram/oauth', {
  //         code: query.code,
  //       })
  //       .then((res) => {
  //         setInstagramToken(res.data.access_token);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [query]);

  // useEffect(() => {
  //   if (instagramToken) {
  //     axios
  //       .get(`https://graph.instagram.com/me?fields=id,username&access_token=${instagramToken}`)
  //       .then((res) => {
  //         setInstagramName(res.data.username);
  //         setConnectInsta(true);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [instagramToken]);

  // const disconnectInsta = useCallback(() => {
  //   setConnectInsta(false);
  //   setInstagramName('');
  //   setInstagramToken('');
  // }, []);

  return (
    <div className={cn('profile-setting-wrap')}>
      <ContentTitle title={t('profileSetting.title')} />
      <div className={cn('profile-container')}>
        <div className={cn('profile-img-section')}>
          <button
            type="button"
            className={cn('btn-user-open')}
            /* 22.11.16 수정 start: 11/17 오픈 시 제외 */
            onClick={() => {
              setPfpModal(true);
            }}
          >
            <Avatar
              className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
              size={offset.width < 768 ? 100 : 120}
              style={{ backgroundImage: profileImg.img && `url(${profileImg.img})` }}
            >
              <span className={cn('a11y')}>{t('a11y.settingProfile')}</span>
            </Avatar>
          </button>
          <p className={cn('profile-img-desc')}>{t('profileSetting.desc')}</p>
          <PfpModal isOpen={pfpModal} setIsOpen={setPfpModal} value={profileImg} setValue={setProfileImg} />
        </div>
        <div className={cn('profile-form-section')}>
          <Form
            name="nest-messages"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            form={form}
            initialValues={{
              nickname: userInfo.nickname,
              description: userInfo.description,
              url: userInfo.url,
              displayAsset: userInfo.displayAsset,
            }}
          >
            <Form.Item
              name="nickname"
              label={t('profileSetting.userName')}
              className={cn('profile-form-item')}
              required
              rules={[
                {
                  validator: validateNickname,
                },
              ]}
            >
              <Input placeholder={t('profileSetting.userNamePlaceholder')} />
            </Form.Item>
            <Form.Item name={'description'} label={t('profileSetting.about')} className={cn('profile-form-item')}>
              <Input.TextArea showCount maxLength={200} placeholder={t('profileSetting.aboutPlaceholder')} />
            </Form.Item>
            {/* TODO : SNS CONNECT */}
            {/* <div className={cn('profile-form-item connect-sns-wrap')}>
              <strong className={cn('label')}>{t('profileSetting.social')}</strong>
              <p className={cn('sns-desc')}>{t('profileSetting.socialDesc')}</p>
              <div className={cn('sns-button-wrap')}>
                {connectTwitter ? (
                  <div className={cn('sns-complete')}>
                    <span className={cn('sns-id')}>
                      <IconTwitterColor />
                      Scarletjang
                    </span>
                    <button type="button" className={cn('btn-disconnect')}>
                      <span className={cn('a11y')}>{t('profileSetting.disconnectSocial')}</span>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
                    </button>
                  </div>
                ) : (
                  <OutlineButton
                    buttonText={locale === 'ko' ? 'Twitter 연결' : 'Connect Twitter'}
                    color="gray"
                    size="md"
                    iconType
                    iconValue="twitterColor"
                  />
                )}
                {connectInsta ? (
                  <div className={cn('sns-complete')}>
                    <span className={cn('sns-id')}>
                      <IconInstaColor />
                      {instagramName}
                    </span>
                    <button type="button" className={cn('btn-disconnect')} onClick={disconnectInsta}>
                      <span className={cn('a11y')}>{t('profileSetting.disconnectSocial')}</span>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
                    </button>
                  </div>
                ) : (
                  <a
                    href={`https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ENV_INSTAGRAM_APP_ID}&redirect_uri=https://localhost:3001/mypage/profile&response_type=code&scope=user_profile`}
                  >
                    <OutlineButton
                      buttonText={locale === 'ko' ? 'Instagram 연결' : 'Connect Instagram'}
                      color="gray"
                      size="md"
                      iconType
                      iconValue="instaColor"
                      type="link"
                    />
                  </a>
                )}
              </div>
            </div> */}
            <Form.Item
              name={'url'}
              label={t('profileSetting.link')}
              className={cn('profile-form-item')}
              rules={[
                {
                  validator: validateUrl,
                },
              ]}
            >
              <Input placeholder={t('profileSetting.linkPlaceholder')} />
            </Form.Item>
            <Form.Item name="displayAsset" label={t('profileSetting.asset')}
                       className={cn('profile-form-item radio-button-wrap')}>
              <Radio.Group size="middle">
                <Radio.Button value="public">
                  <span className={cn('inner-text')}>{t('profileSetting.public')}</span>
                </Radio.Button>
                <Radio.Button value="onlyMe">
                  <span className={cn('inner-text')}>{t('profileSetting.onlyMe')}</span>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item className={cn('profile-form-item')}>
              <div className={cn('button-wrap')}>
                <OutlineButton
                  buttonText={t('profileSetting.cancel')}
                  color="black"
                  size="md"
                  onClick={() => {
                    console.log(form.getFieldValue('nickname'));
                    setConfirmModal(true);
                  }}
                />
                <BgButton buttonText={t('profileSetting.save')} color="black" size="md" htmlType="submit" />
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ModalLayout
        isOpen={isConfirmModal}
        setIsOpen={setConfirmModal}
        size="sm"
        title={t('profileSetting.confirmCancel')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('profileSetting.close')}
            color="black"
            size="md"
            key="Close"
            onClick={() => {
              setConfirmModal(false);
            }}
          />,
          <BgButton buttonText={t('profileSetting.yesClose')} color="black" size="md" key="Save" href="/mypage" />,
        ]}
      >
        <p>{t('profileSetting.confirmCancelDesc')}</p>
      </ModalLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['common', 'mypage']);

  return { props: { ...translations } };
};

export default Profile;
