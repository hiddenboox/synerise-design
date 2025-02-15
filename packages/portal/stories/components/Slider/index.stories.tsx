import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select, object, array } from '@storybook/addon-knobs';

import Slider from '@synerise/ds-slider';
import { Props as SliderProps } from '@synerise/ds-slider/dist/Slider.types';
import { AllocationVariant } from '@synerise/ds-slider/dist/Allocation/Allocation.types';

const decorator = storyFn => <div style={{ padding: '48px' }}>{storyFn()}</div>;

const sliderValues = [0, 25, 75, 100];
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
];
const allocationVariants: AllocationVariant[] = [
  { name: 'Variant A', percentage: 33, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 33, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 34, tabId: 3, tabLetter: 'C' },
];
const customColorOptions = {
  red: 'red-600',
  green: 'green-600',
  yellow: 'yellow-600',
  pink: 'pink-600',
  mars: 'mars-600',
  orange: 'orange-600',
  fern: 'fern-600',
  cyan: 'cyan-600',
  purple: 'purple-600',
  violet: 'violet-600',
};
const mark = {
  0: '0',
  100: '100',
};
const tracksColorMap = {
  '0': 'cyan-600',
  '1': 'yellow-600',
  '2': 'pink-600',
  '3': 'green-600',
  '4': 'mars-600',
  '5': 'orange-600',
  '6': 'purple-600',
  '7': 'violet-600',
  '8': 'red-600',
  '9': 'fern-600',
};

const tipFormatter = (value: string) => <div className="Tip">{value}%</div>;

const Wrapper = (props: any) => {
  const [value, setValue] = React.useState(50);
  const [rangeValue, setRangeValue] = React.useState([-50, 50]);
  const hasMarks = boolean('Set Marks', false);
  const descriptionMessage = text('Description', 'Description');
  const hasDescription = boolean('Set Description', false);
  const [tracksColor, setTracksColor] = React.useState(tracksColorMap);
  const color = select('Set color', customColorOptions, customColorOptions.green);
  const getDescription = (hasDescription: boolean): string => {
    if (hasDescription) {
      return descriptionMessage;
    } else {
      return '';
    }
  };
  React.useEffect(() => {
    setTracksColor({ ...tracksColor, '0': color });
  },[color]);
console.log(tracksColor)
  return (
    <Slider
      {...props}
      marks={hasMarks && mark}
      description={descriptionMessage && getDescription(hasDescription)}
      value={props.range ? rangeValue : value}
      onChange={props.range ? setRangeValue : setValue}
      hideMinAndMaxMarks={true}
      tracksColorMap={tracksColor}
    />
  );
};

const WrapperMultiMode = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(sliderValues);
  return (
    <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
  );
};
const WrapperMultiValuesMode = (props: SliderProps) => {
  const [variants, setVariants] = React.useState<AllocationVariant[]>(allocationVariants);
  return (
    <Slider
      {...props}
      type={'allocation'}
      allocationConfig={{
        variants,
        onAllocationChange: setVariants,
        controlGroupEnabled: false,
        controlGroupLabel: 'CG',
        controlGroupTooltip: 'Control group',
      }}
    />
  );
};
const stories = {
  default: () => (
    <Wrapper
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      reverse={boolean('Reverse', false)}
      included={boolean('Included', true)}
      inverted={boolean('Inverted', false)}
      max={number('Max', 100)}
      min={number('Min', 0)}
      range={boolean('Range', false)}
      step={number('Step', 10)}
      dots={boolean('Dots', false)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      tooltipPlacement={'bottom'}
      getTooltipPopupContainer={container => container}
      useColorPalette={boolean('UseColorPalette', false)}
      tooltipVisible={boolean('Value visible', false)}
      thick={boolean('Set thick', false)}
    />
  ),
  /*  withVisibleLabels: () => (
    <Wrapper
      tooltipVisible={true}
      disabled={boolean('disabled', false)}
      dots={boolean('dots', false)}
      included={boolean('included', true)}
      inverted={boolean('inverted', false)}
      max={number('max', 24)}
      min={number('min', 0)}
      range={boolean('range', true)}
      step={number('step', 1)}
      onAfterChange={action('onAfterChange')}
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('useColorPalette', false)}
      getTooltipPopupContainer={() => document.body}
      thick={boolean('Set thick', false)}
    />
  ),*/
  multipleRange: () => (
    <WrapperMultiMode
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      dots={boolean('Dots', false)}
      included={boolean('Included', true)}
      inverted={boolean('Inverted', false)}
      max={number('Max', 100)}
      min={number('Min', 0)}
      range={boolean('Range', true)}
      step={number('Step', 1)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      getTooltipPopupContainer={container => container}
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('UseColorPalette', true)}
      thick={boolean('Set thick', false)}
      tooltipVisible={boolean('Value visible', false)}
      tracksColorMap={tracksColorMap}
    />
  ),
  multiValuesRanges: () => (
    <WrapperMultiValuesMode
      label={text('label', 'Label')}
      disabled={boolean('Disabled', false)}
      tipFormatter={tipFormatter as any}
      tracksColorMap={tracksColorMap}
    />
  ),
};

export default {
  name: 'Components/Slider',
  withoutCenter: true,
  decorator,
  stories,
};
