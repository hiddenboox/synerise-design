import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import RawDateRangePicker from './RawDateRangePicker';
import * as S from './DateRangePicker.styles';
import { Props } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { DateFilter, DateRange } from './date.types';

const DateRangePicker: React.FC<Props> = (props) => {
  const { value, onApply, showTime, onValueChange } = props;
  const [dropVisible, setDropVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(value);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    !!dropVisible && setDropVisible(false);
  });
  const onValueChangeCallback = React.useCallback(
    (val: Partial<DateFilter>): void => {
      onValueChange && onValueChange(val);
      setSelectedDate(val as DateRange);
    },
    [onValueChange]
  );
  const onApplyCallback = React.useCallback(
    (val: Partial<DateFilter>): void => {
      onApply && onApply(val);
      setSelectedDate(val as DateRange);
      setDropVisible(false);
    },
    [onApply]
  );
  return (
    <Dropdown
      overlay={
        <S.OverlayContainer ref={ref}>
          <RawDateRangePicker
            {...props}
            showTime={showTime}
            onApply={onApplyCallback}
            onValueChange={onValueChangeCallback}
            value={selectedDate}
          />
        </S.OverlayContainer>
      }
      visible={!!dropVisible}
    >
      <RangePickerInput onClick={(): void => setDropVisible(!dropVisible)} value={value} />
    </Dropdown>
  );
};

export default DateRangePicker;
export { RawDateRangePicker };
