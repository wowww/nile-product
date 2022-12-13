import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Checkbox, Collapse, Drawer, Form, Input, Select } from 'antd';
import { Helmet } from 'react-helmet-async';
import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import IconButton from '@/components/button/IconButton';
import { ReactSVG } from 'react-svg';

import { useTranslation } from 'next-i18next';
import { NileCollectionCategory } from '@/models/nile/marketplace/NileCollection';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import { FilterType } from '@/state/filterAtom';

const { Panel } = Collapse;
const { Option } = Select;

type FilterProps = {
  sharedFilter: FilterType;
  setSharedFilter: (v: any) => void;
  categories?: NileCollectionCategory[];
  isCollectionFilter?: boolean;
};

const Filter = ({ sharedFilter, setSharedFilter, categories, isCollectionFilter }: FilterProps) => {
  const offset = useAtomValue(windowResizeAtom);
  const { t } = useTranslation('common');
  const [form] = Form.useForm();

  const [selectedFilter, setSelectedFilter] = useState(sharedFilter);
  const selectedCount = useMemo(() => 0, []);

  const isMobile = useMemo(() => {
    return offset.width < 768;
  }, [offset]);

  useEffect(() => {
    form.setFieldsValue(sharedFilter);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setSharedFilter(selectedFilter);
    }
  }, [selectedFilter, isMobile]);

  const filter2Depth = (menu: string, selected: number) => {
    return (
      <div className={cn('filter-2depth-menu-inner')}>
        <strong>{menu}</strong>
        <span className={cn('filter-selected')}>
          {selected > 0 ? (
            <Tag size="xs" bg>
              {selected > 98 ? '+99' : selected}
            </Tag>
          ) : (
            ''
          )}
        </span>
      </div>
    );
  };

  const [open, setOpen] = useState(false);

  const getSelectedCategoryCount = useCallback(
    (slug: string) => {
      return selectedFilter.collections?.[slug]?.length ?? 0;
    },
    [selectedFilter],
  );

  const onClickReset = useCallback(() => {
    form.resetFields();
    form.setFieldValue('sorting', 'orderEndAt,asc');
    form.setFieldValue('status', ['OPEN']);
    if (isMobile) {
      setSelectedFilter(() => ({ ...form.getFieldsValue() }));
    } else {
      setSharedFilter(() => ({ ...form.getFieldsValue() }));
    }
  }, []);

  const statusFilter = [
    { label: t('upcoming'), value: 'NONE' },
    { label: t('auctionClosed'), value: 'COMPLETE' },
    // { label: t('openForOffers'), value: 'NONE' },
    { label: t('onAuction'), value: 'OPEN' },
    // { label: t('buyNow') },
    { label: t('openForOffers'), value: 'CLOSE' },
  ];

  const onValuesChange = (values: any) => {
    if (isMobile) {
      setSelectedFilter((prev) => ({ ...prev, ...values }));
    } else {
      setSharedFilter((prev: any) => ({ ...prev, ...values }));
    }
  };

  const onFinish = (values: any) => {
    setSharedFilter((prev: any) => ({ ...prev, ...values }));
    setOpen(false);
  };

  const filters = () => {
    return (
      <Form className={cn('filter-wrap')} form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
        <Collapse expandIconPosition="end" className={cn('filter-1depth')} defaultActiveKey={2}>
          <Panel header={t('filter.categories')} key="1" style={{ display: 'none' }}>
            <Collapse
              accordion
              expandIconPosition="end"
              className={cn('filter-2depth')}
              expandIcon={({ isActive }) => (
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg"
                          rotate={isActive ? 180 : 90} />
              )}
            >
              {categories?.map((category) => {
                return (
                  <Panel key={category.id}
                         header={filter2Depth(category.name, getSelectedCategoryCount(category.slug))}>
                    <Form.Item name={[isCollectionFilter ? 'properties' : 'collections', category.slug]}>
                      <Checkbox.Group
                        options={category.collections.map((collection) => ({
                          label: collection.name,
                          value: collection.id ?? '',
                        }))}
                        // value={sharedFilter.collections?[category.name] : undefined}
                      />
                    </Form.Item>
                  </Panel>
                );
              })}
            </Collapse>
          </Panel>
          <Panel header={t('filter.details')} key="2">
            <dl className={cn('filter-detail-list-wrap')}>
              <dt>{t('filter.status')}</dt>
              <dd>
                <Form.Item name={['status']}>
                  <Checkbox.Group options={statusFilter} />
                </Form.Item>
              </dd>
              <dt style={{ display: 'none' }}>{t('filter.priceRange')}</dt>
              <dd style={{ display: 'none' }}>
                <div className={cn('input-group-wrap')}>
                  {isMobile ? (
                    <Input placeholder="Min" size="middle" />
                  ) : (
                    <Form.Item name={['price', 'min']}>
                      <Input placeholder="Min" size="small" />
                    </Form.Item>
                  )}
                  <span>to</span>
                  {isMobile ? (
                    <Input placeholder="Max" size="middle" />
                  ) : (
                    <Form.Item name={['price', 'max']}>
                      <Input placeholder="Max" size="small" />
                    </Form.Item>
                  )}
                </div>
                <Form.Item name={['price', 'unit']}>
                  <Select
                    size="small"
                    className={cn('width-full')}
                    defaultValue="WEMIX$"
                    suffixIcon={<ReactSVG
                      src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
                    popupClassName="select-size-sm-dropdown"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <Option value="WEMIX$">WEMIX$</Option>
                    <Option value="WEMIX">WEMIX</Option>
                  </Select>
                </Form.Item>
                {offset.width > 767 ? <OutlineButton buttonText={t('filter.setPrice')} color="black" size="sm" /> : ''}
              </dd>
              <dt>Sorting</dt>
              <dd>
                <Form.Item name={['sorting']}>
                  <Select
                    size="middle"
                    className={cn('width-full')}
                    suffixIcon={<ReactSVG
                      src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
                    popupClassName="select-size-sm-dropdown"
                    listHeight={100} /* 22.10.11 수정: max-height 값 추가 */
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <Option value="updatedAt,desc">{t('sorting.recentlyActive')}</Option>
                    {form.getFieldValue('status') && form.getFieldValue('status').includes('OPEN') && (
                      <Option value="orderEndAt,asc">{t('sorting.endingSoon')}</Option>
                    )}
                    <Option value="createdAt,desc">{t('sorting.newest')}</Option>
                    <Option value="createdAt,asc">{t('sorting.oldest')}</Option>
                    <Option value="price,desc">{t('sorting.highestPrice')}</Option>
                    <Option value="price,asc">{t('sorting.lowestPrice')}</Option>
                  </Select>
                </Form.Item>
              </dd>
            </dl>
          </Panel>
        </Collapse>
        <OutlineButton buttonText={t('filter.resetFilter')} color="black" size="md" iconType iconValue="reset"
                       onClick={onClickReset} />
        {offset.width < 768 ? <BgButton htmlType="submit" buttonText="Apply" color="black" size="md" /> : ''}
      </Form>
    );
  };

  return (
    <>
      <Helmet>
        <html className={cn(offset.width < 768 && open && 'body-lock')} />
        <body className={cn(offset.width < 768 && open && 'body-lock')} />
      </Helmet>
      {offset.width < 1280 ? (
        <div className={cn('filter-btn-wrap')}>
          {selectedCount > 0 ? <span className={cn('filter-selected-num')}>{selectedCount}</span> : ''}
          <OutlineButton buttonText={t('filter.title')} color="black" size="md" iconType iconValue="filter"
                         onClick={() => setOpen(true)} />
          <Drawer
            title={t('filter.title')}
            open={open}
            placement="left"
            closable={false}
            onClose={() => setOpen(false)}
            key="left"
            maskClosable={false}
            mask={false}
            extra={<IconButton iconValue="close" onClick={() => setOpen(false)} buttonText="Close" size="32" />}
            className="filter-inner-wrap"
          >
            {filters()}
          </Drawer>
        </div>
      ) : (
        filters()
      )}
    </>
  );
};

export default Filter;
