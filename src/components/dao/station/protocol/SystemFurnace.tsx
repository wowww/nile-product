import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

const SystemFurnace = () => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.furnace.title1')}</dt>
        <dd>{t('station.operationSystem.furnace.desc1')}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.furnace.title2')}</dt>
        <dd>
          {t('station.operationSystem.furnace.item.0.text')}
          <ul>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.furnace.item.0.list.0.text')}
              <ul>
                <li>
                  {t('station.operationSystem.furnace.item.0.list.0.list2.0.text')}
                  <ul>
                    <li>
                      {t('station.operationSystem.furnace.item.0.list.0.list2.0.list3.0.text')}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.furnace.item.0.list.0.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '40% : 60%',
                            }}
                          >
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.furnace.item.0.list.0.list2.0.list3.1.text')}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.furnace.item.0.list.0.list2.0.list3.1.desc"
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
                    <li>
                      {t('station.operationSystem.furnace.item.0.list.0.list2.0.list3.2.text')}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.furnace.item.0.list.0.list2.0.list3.2.desc"
                            ns="dao"
                            values={{
                              strong1: '41% : 59%',
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

export default SystemFurnace;
