import styled from 'styled-components';
import Icon from '@synerise/ds-icon';
import { IconProps } from '@synerise/ds-icon/dist/Icon';

export const AddItemLayout = styled.div`
  display: inline;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const AddItemLabel = styled.span`
  margin-left: 12px;
`;
export const Overlay = styled.div`
  background: ${(props): string => props.theme.palette.white};
  min-width: 262px;
`;
export const OverlayFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
export const FavouriteIcon = styled(Icon)<IconProps & { favourite?: boolean }>`
  ${(props): false | string =>
    !!props.favourite &&
    `&.icon.icon1.ds-icon svg {
  fill: ${props.theme.palette['yellow-600']};
  }`}
`;
