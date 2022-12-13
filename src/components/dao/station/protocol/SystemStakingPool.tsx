import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

const SystemStakingPool = () => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.stakingPool.title1')}</dt>
        <dd>{t('station.operationSystem.stakingPool.desc1')}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.stakingPool.title2')}</dt>
        <dd>
          {t('station.operationSystem.stakingPool.item.0.text')}
          <ul>
            <li>{t('station.operationSystem.stakingPool.item.0.list.0.text')}</li>
            <li>{t('station.operationSystem.stakingPool.item.0.list.1.text')}</li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.stakingPool.item.0.list.2.text')}
              <ul>
                <li>
                  <Trans
                    i18nKey="station.operationSystem.stakingPool.item.0.list.2.desc"
                    ns="dao"
                    values={{
                      strong1: '1: 1.4123',
                    }}
                  >
                    <strong className={cn('important')}></strong>
                  </Trans>
                </li>
              </ul>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  );
};

export default SystemStakingPool;
