import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { Modal } from 'antd';
import useWindowResize from '@/hook/useWindowResize';
import useScrollLock from '@/hook/useScrollLock';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  title?: string | JSX.Element;
  children: ReactNode;
  /* 22.10.04 수정: type 추가 */
  /* 22.10.13 수정: lg-t type 추가 */
  size?: 'sm' | 'md' | 'lg' | 'md-t' | 'lg-t';
  footer?: boolean;
  /* 22.10.04 수정 start: props 변경 및 추가 */
  titleType?: 'center' | undefined;
  titleFont?: 'serif' | undefined;
  subTitle?: string | JSX.Element;
  destroyOnClose?: boolean;
  /* 22.10.04 수정 end: props 변경 및 추가 */
  footerContent?: ReactElement[];
  wrapClassName?: string;
  style?: CSSProperties;
  closable?: boolean;
  maskClosable?: boolean;
}

const ModalLayout = ({
  isOpen,
  setIsOpen,
  title,
  children,
  size = 'md',
  footer = false,
  footerContent,
  /* 22.10.04 수정 start: props 변경 및 추가 */
  titleType = undefined,
  titleFont = undefined,
  subTitle,
  destroyOnClose = false,
  /* 22.10.04 수정 end: props 변경 및 추가 */
  wrapClassName,
  style,
  closable = true,
  maskClosable = true,
}: ModalProps) => {
  const scrollLock = useScrollLock(isOpen);
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
    document.body.removeAttribute('style');
  };

  const onOk = () => {
    Modal.destroyAll();
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        className={cn(
          'modal-wrap',
          `modal-size-${size}`,
          !footer && 'none-footer',
          /* 22.10.04 수정 start: 클래스 분기 변경 */
          titleType === 'center' && 'title-center-type',
          titleFont === 'serif' && 'serif'
          /* 22.10.04 수정 end: 클래스 분기 변경 */
        )}
        closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
        /* 22.10.04 수정 start: title props 추가 */
        title={
          <>
            {title}
            {/* 22.10.13 수정: lg-t type 추가 */}
            {(size === 'md-t' || size === 'lg-t') && <div className={cn('modal-sub-title')}>{subTitle}</div>}
          </>
        }
        style={style && style}
        /* 22.10.04 수정 end: title props 추가 */
        footer={footer && footerContent}
        width={'none'}
        open={isOpen}
        onCancel={onCancel}
        centered={true}
        wrapClassName={wrapClassName}
        /* 22.10.04 수정: props 추가 */
        destroyOnClose={destroyOnClose}
        closable={closable}
        maskClosable={maskClosable}
      >
        <div className={cn('modal-body')}>{children}</div>
      </Modal>
    </>
  );
};

export default ModalLayout;
