import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import { Trans, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

const TokenInfo = () => {
  const { t } = useTranslation(['tokens', 'common']);
  const btnList = [
    {
      name: 'medium',
      icon: <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_medium.svg' />,
    },
    {
      name: 'telegram',
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_telegram.svg" />,
    },
    {
      name: 'twitter',
      icon: <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_twitter.svg' />,
    },
    {
      name: 'youtube',
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_youtube.svg" />,
    },
    {
      name: 'facebook',
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_facebook.svg" />,
    },
    {
      name: 'discord',
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />,
    },
    {
      name: 'gitbook',
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_gitbook.svg" />,
    },
  ];
  return (
    <div className={cn('token-info-wrap')}>
      <strong className={cn('info-title')}>{t('tokenInfo.title')}</strong>
      <p className={cn('info-contents')}>
        <Trans i18nKey={t('tokenInfo.desc')} />
      </p>
      <div className={cn('btn-wrap')}>
        <OutlineButton buttonText={t('tokenInfo.link.official')} color="black" align size="sm" iconType iconValue="link" href="#" target="_blank" />
        <ul className={cn('token-sns')}>
          {btnList.map((el, idx) => (
            <li key={el.name}>
              <a href={'#'} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
                <span className={cn('a11y')}>{el.name}</span>
                {el.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TokenInfo;
