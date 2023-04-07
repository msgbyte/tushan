import { Button, ButtonProps } from '@arco-design/web-react';
import React, { useState } from 'react';

interface SubmitButtonProps extends ButtonProps {
  onClick: (e: Event) => void | Promise<void>;
}

export const SubmitButton: React.FC<SubmitButtonProps> = React.memo((props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      {...props}
      onClick={async (e) => {
        if (props.onClick) {
          setLoading(true);
          await props.onClick(e);
          setLoading(false);
        }
      }}
    />
  );
});
SubmitButton.displayName = 'SubmitButton';
