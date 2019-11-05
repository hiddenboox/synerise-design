import * as React from 'react';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Popconfirm from '@synerise/ds-popconfirm';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import ClickM from '@synerise/ds-icon/dist/icons/ClickM';

const decorator = storyFn => <div style={{ padding: 40 }}>{storyFn()}</div>;

const typeOptions = ['default', 'primary', 'ghost', 'dashed', 'danger', 'link', 'success', 'flat', 'warning'] as const;

const placements = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
] as const;

const triggers = ['hover', 'focus', 'click', 'contextMenu'] as const;

const getDefaultProps = () => ({
  cancelText: text('cancelText', 'cancel'),
  okText: text('okText', 'ok'),
  okType: select('Set type', typeOptions, 'primary'),
  title: text('title', 'title'),
  onCancel: action('onCancel Clicked'),
  onConfirm: action('onConfirm Clicked'),
  disabled: boolean('disabled', false),
  placement: select('placement', placements, 'top'),
  onVisibleChange: action('onVisibilityChange'),
  mouseEnterDelay: number('mouseEnterDelay', 250),
  mouseLeaveDelay: number('mouseLeaveDelay', 250),
  trigger: select('trigger', triggers, 'click'),
});

const stories = {
  default: () => {
    return (
      <>
        <Popconfirm
          {...getDefaultProps()}
          okButtonProps={{
            size: 'large',
          }}
          cancelButtonProps={{
            icon: 'user',
          }}
          icon={<Icon component={<ClickM />} />}
        >
          <Button>Click me</Button>
        </Popconfirm>
      </>
    );
  },
};

export default {
  name: 'Components|Popconfirm',
  decorator,
  stories,
  Component: Popconfirm,
};
