import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

const SystemTrust = () => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.trust.title1')}</dt>
        <dd>{t('station.operationSystem.trust.desc1')}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.trust.title2')}</dt>
        <dd>
          {t('station.operationSystem.trust.item.0.text')}
          <ul>
            <li>{t('station.operationSystem.trust.item.0.list.0.text')}</li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.trust.item.0.list.1.text')}
              <ul>
                <li>
                  {t('station.operationSystem.trust.item.0.list.1.list2.0.text')}
                  <ul>
                    <li>
                      {t('station.operationSystem.trust.item.0.list.1.list2.0.list3.0.text')}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.trust.item.0.list.1.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '50% : 50%',
                              strong2: '3%',
                            }}
                          >
                            <strong className={cn('important')}></strong>
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.trust.item.0.list.1.list2.0.list3.1.text')}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.trust.item.0.list.1.list2.0.list3.1.desc"
                            ns="dao"
                            values={{
                              strong1: '60% : 40%',
                            }}
                          >
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.trust.item.0.list.1.list2.0.list3.2.text')}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.trust.item.0.list.1.list2.0.list3.2.desc"
                            ns="dao"
                            values={{
                              strong1: '35% : 65%',
                            }}
                          >
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  );
};

export default SystemTrust;
