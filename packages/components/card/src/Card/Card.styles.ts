import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Typography from '@synerise/ds-typography';
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { ThemePropsVars } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Backgrounds } from './Card.types';

const whiteBg = ['white', 'white-shadow'];
const greyBg = ['grey', 'grey-shadow'];
const withBoxShadow = ['white-shadow', 'grey-shadow'];
const withOutline = ['outline'];
const backgroundColor = (props: { background: Backgrounds; theme: ThemePropsVars }): string => {
  if (whiteBg.includes(props.background)) return props.theme.palette.white;
  if (greyBg.includes(props.background)) return props.theme.palette['grey-050'];
  return props.theme.palette.transparent;
};

const boxShadow = (props: { background: Backgrounds; theme: ThemePropsVars }): string => {
  if (withBoxShadow.includes(props.background)) return props.theme.variable('@box-shadow-base') as string;
  if (withOutline.includes(props.background)) return `${props.theme.palette['grey-200']} 0px 0px 0px 1px inset`;
  return 'none';
};

export const HeaderSideChildren = styled.div`
  position: relative;
  padding-left: 24px;
`;

export const IconContainer = styled.div<{ compact?: boolean }>`
  width: 24px;
  height: 24px;
  margin-top: ${(props): string => (props.compact ? '4px' : '0px')};
`;

export const Container = styled.div<{
  raised?: boolean;
  disabled?: boolean;
  lively?: boolean;
  background: Backgrounds;
}>`
  background-color: ${(props): string => (props.background ? backgroundColor(props) : props.theme.palette.transparent)};
  box-shadow: ${(props): string => (props.background ? boxShadow(props) : 'none')};
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  display: flex;
  flex-flow: column;
  width: 100%;

  .card-animation {
    > * {
      transition: opacity 0.3s ease;
      opacity: 0;
    }

    &.rah-static--height-auto {
      > * {
        opacity: 1;
      }
    }
  }

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.raised &&
    css`
      box-shadow: ${props.theme.variable('@box-shadow-active')};
    `}

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
      ${HeaderSideChildren} {
        opacity: 0.16;
      }
      ${IconContainer} {
        opacity: 0.4;
      }
    `};

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.lively &&
    css`
      &:hover {
        box-shadow: ${props.theme.variable('@box-shadow-active')};
      }
    `}
`;

export const Header = styled.div<{ onClick?: React.MouseEventHandler; headerBorderBottom?: boolean }>`
  padding: 24px 24px 24px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  position: relative;
  &:after {
    position: absolute;
    bottom: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    content: '';
    display: ${(props): string => (props.headerBorderBottom ? 'block' : 'none')};
    background-color: ${(props): string => props.theme.palette['grey-100']};
  }
  &:hover {
    ${(props): string | false => !!props.onClick && `cursor:pointer;`}
  }
`;

export const Title = styled(Typography.Title)<{ fat: boolean }>`
  && {
    display: flex;
    align-items: center;
    min-height: ${(props): string => (props.fat ? '32px' : '20px')};
    margin: 0;
  }
`;

export const Description = styled.p`
  && {
    margin: 6px 0 0;
  }
`;

export const HeaderContent = styled.div<{ compact?: boolean; hasIcon: boolean }>`
  max-width: 100%;
  flex: 1;

  ${(props): FlattenSimpleInterpolation | false =>
    props.hasIcon &&
    css`
      margin: 0 0 0 20px;
    `};

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.compact &&
    css`
      display: flex;
      align-items: flex-start;
      flex-direction: row;

      ${Title} {
        height: 32px;
        line-height: 32px;
        margin: 0;
      }

      ${Description} {
        border-left: 1px solid ${props.theme.palette['grey-200']};
        height: 32px;
        line-height: 32px;
        padding: 0 0 0 24px;
        margin: 0 0 0 24px;
      }
    `}
`;

export const ChildrenContainer = styled.div`
  overflow: hidden;
`;

export const PaddingWrapper = styled.div<{ withHeader?: boolean; withoutPadding?: boolean }>`
  padding: ${(props): string => (props.withoutPadding ? '0' : `24px`)};
  ${(props): string | false => !!props.withHeader && `padding-top: 0;`}
`;
export const FooterContainer = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${(props): string => props.theme.palette.white};
  border-top: solid 1px ${(props): string => props.theme.palette['grey-100']};
`;
