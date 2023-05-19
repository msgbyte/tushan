import { Button, ButtonProps, Modal } from '@arco-design/web-react';
import React, { useState } from 'react';
import { useTranslation } from '../i18n';

interface Props extends ButtonProps {
  confirmTitle?: string;
  confirmContent?: string;
  onConfirm?: () => void | Promise<void>;
}
export const ButtonWithConfirm: React.FC<Props> = React.memo((props) => {
  const { t } = useTranslation();

  const {
    confirmTitle = t('tushan.common.confirmTitle'),
    confirmContent = t('tushan.common.confirmContent'),
    onConfirm,
    ...buttonProps
  } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        {...buttonProps}
      />

      <Modal
        visible={visible}
        okButtonProps={{
          loading,
        }}
        title={confirmTitle}
        onConfirm={async () => {
          setLoading(true);
          await props.onConfirm?.();
          setLoading(false);
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {confirmContent}
      </Modal>
    </>
  );
});
ButtonWithConfirm.displayName = 'ButtonWithConfirm';
