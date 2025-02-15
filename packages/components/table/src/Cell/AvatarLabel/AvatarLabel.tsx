import * as React from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './AvatarLabel.styles';
import { Props } from './AvatarLabel.types';

const AvatarLabel: React.FC<Props> = ({
  avatar,
  avatarAction,
  title,
  labels,
  icon,
  textSize = 'default',
  ellipsis,
  maxWidth,
  avatarSize,
  starCell,
}) => {
  return (
    <S.AvatarLabel>
      {starCell && <S.StarCell>{starCell}</S.StarCell>}
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Avatar onClick={avatarAction} clickable={Boolean(avatarAction)}>
        {avatar}
      </S.Avatar>
      <S.Description>
        <S.Title
          withLabels={Boolean(labels?.length)}
          textSize={textSize}
          ellipsis={Boolean(ellipsis)}
          maxWidth={maxWidth}
          avatarSize={avatarSize}
        >
          {title}
        </S.Title>
        {labels?.map(
          (label: string | React.ReactNode): React.ReactElement => (
            <S.Label key={uuid()} textSize={textSize} ellipsis={Boolean(ellipsis)} maxWidth={maxWidth}>
              {label}
            </S.Label>
          )
        )}
      </S.Description>
    </S.AvatarLabel>
  );
};

export default AvatarLabel;
