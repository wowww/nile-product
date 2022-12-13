import cn from 'classnames';
import { useTranslation } from 'next-i18next';

const SystemStation = () => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.station.title1')}</dt>
        <dd>{t('station.operationSystem.station.desc1')}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.station.title2')}</dt>
        <dd>
          {t('station.operationSystem.station.desc2')}
          <ul>
            <li>{t('station.operationSystem.station.item.0.text')}</li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.station.item.1.title')}
              <ul>
                <li>{t('station.operationSystem.station.item.1.list.0.text')}</li>
                <li>
                  {t('station.operationSystem.station.item.1.list.1.text')}
                  <ul>
                    <li> {t('station.operationSystem.station.item.1.list.1.desc')}</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.station.item.2.title')}
              <ul>
                <li>{t('station.operationSystem.station.item.2.list.0.text')}</li>
                <li> {t('station.operationSystem.station.item.2.list.1.text')}</li>
                <li>
                  {t('station.operationSystem.station.item.2.list.2.text')}
                  <ul>
                    <li>{t('station.operationSystem.station.item.2.list.2.desc')}</li>
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

export default SystemStation;
