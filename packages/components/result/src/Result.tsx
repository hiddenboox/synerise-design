import * as React from 'react';

import Icon from '@synerise/ds-icon';
import WarningM from '@synerise/ds-icon/dist/icons/WarningM';
import CheckM from '@synerise/ds-icon/dist/icons/CheckM';
import HourglassM from '@synerise/ds-icon/dist/icons/HourglassM';
import SearchNoResultsM from '@synerise/ds-icon/dist/icons/SearchNoResultsM';
import InfoM from '@synerise/ds-icon/dist/icons/InfoM';

import * as S from './Result.styles';

export type ResultProps = {
  className?: string;
  title: string;
  type: string | 'info' | 'warning' | 'error' | 'success' | 'progress' | 'no-results';
  description?: string;
  buttons?: React.ReactNode;
  panel?: React.ReactNode;
  customIcon?: Element;
};

const mapTypeToStatus = {
  info: {
    IconComponent: InfoM,
    iconColor: 'blue-600',
    background: 'blue-050',
  },
  warning: {
    IconComponent: WarningM,
    iconColor: 'yellow-600',
    background: 'yellow-100',
  },
  error: {
    IconComponent: WarningM,
    iconColor: 'red-600',
    background: 'red-100',
  },
  success: {
    IconComponent: CheckM,
    iconColor: 'green-600',
    background: 'green-100',
  },
  progress: {
    IconComponent: HourglassM,
    iconColor: 'grey-600',
    background: 'grey-100',
  },
  'no-results': {
    IconComponent: SearchNoResultsM,
    iconColor: 'grey-600',
    background: 'grey-100',
  },
};

const Result: React.FC<ResultProps> = ({ className, type, title, description, panel, buttons, customIcon = null }) => {
  const { IconComponent, ...iconContainerStyles } = mapTypeToStatus[type];

  return (
    <S.ResultContainer className={`ds-result ${className}`}>
      <S.MainPanel>
        <S.ResultIconContainer>
          {customIcon || (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <S.StatusIconContainer {...iconContainerStyles}>
              <Icon component={<IconComponent />} size={24} />
            </S.StatusIconContainer>
          )}
        </S.ResultIconContainer>

        {title && <S.Title>{title}</S.Title>}

        {description && <S.Description>{description}</S.Description>}
        {panel && <S.PanelContainer>{panel}</S.PanelContainer>}
        {buttons && <S.ButtonContainer>{buttons}</S.ButtonContainer>}
      </S.MainPanel>
    </S.ResultContainer>
  );
};

export default Result;
