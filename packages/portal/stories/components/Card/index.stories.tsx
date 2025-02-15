import * as React from 'react';
import range from 'lodash/range';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Card, { CardGroup, CardBadge } from '@synerise/ds-card';
import Icon from '@synerise/ds-icon';
import { CheckS,Check3M, FilterM, SearchM, UserM, WarningFillM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './stories.styles';
const backgrounds = {
  White: 'white',
  'White with shadow': 'white-shadow',
  Grey: 'grey',
  'Grey with shadow': 'grey-shadow',
  Outlined: 'outline',
};

const init = () => {
  const props = {
    title: text('Title', 'Card header'),
    description: text('Description', 'Description'),
    raised: boolean('Active', false),
    disabled: boolean('Disabled', false),
    lively: boolean('Hover enabled', true),
    withHeader: boolean('With header', true),
    hideContent: boolean('Enable collapsing', true),
    iconColor: text('Icon color', '#54cb0b'),
    compactHeader: boolean('Compact header', false),
    headerBorderBottom: boolean('Header with border bottom', false),
    content: text('Content', 'Example of card content'),
    background: select('Background style', backgrounds, 'white-shadow'),
    showSideChildrenWhenHeaderHidden: boolean('Set Footer Active',false),
  };
  return { props };
};

const renderCard = (props,hideContentInitial= false) => {
  const IconComponent =  <Check3M/>;
  const [hideContent,setHideContent] = React.useState(hideContentInitial)

  return (
      <Card
        lively={props.lively}
        disabled={props.disabled}
        raised={props.raised}
        withHeader={props.withHeader}
        title={props.title}
        description={props.description}
        icon={props.icon || (props.withIcon && IconComponent )}
        iconColor={props.iconColor}
        compactHeader={props.compactHeader}
        onHeaderClick={()=>{setHideContent(!hideContent)}}
        headerSideChildren={props.headerSideChildren}
        headerBorderBottom={props.headerBorderBottom}
        background={props.background}
        hideContent={props.hideContent && hideContent}
        showSideChildrenWhenHeaderHidden={props.showSideChildrenWhenHeaderHidden}
      >
         <div style={{ width: '100%', height: 300 }}>{props.content}</div>
      </Card>
  );
};

const stories = {
  single: () => {
    const {props}  = init()
    return (
      <div
        style={{
          padding: 24,
          marginBottom: '24px',
          width: '100%',
          position: 'absolute',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        <h3>Single card</h3>
        <div style={{ paddingTop: 12, width: '100%' }}>
          {renderCard({ ...props,showSideChildrenWhenHeaderHidden: false, icon: <CardBadge icon={<CheckS />} status="success" /> })}
        </div>
      </div>
    );
  },
  headers: () => {
    const { props } = init();


    return (
      <div
        style={{
          marginBottom: '48px',
          width: '100%',
          position: 'absolute',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >

        <div style={{ padding: '24px' }}>
          <h3>Variants of card header</h3>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              description: null,
              withIcon: false,
              headerSideChildren: null,
              compactHeader: false,
              headerBorderBottom: false,
            },false)}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              description: null,
              withIcon: false,
              compactHeader: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                  <Button type="ghost">Cancel</Button>
                  <Button type="primary">Apply</Button>
                </div>
              ),
            },false)}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              withIcon: false,
              compactHeader: true,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<FilterM />} />{' '}
                  </Button>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<SearchM />} />{' '}`
                  </Button>
                </div>
              ),
              showSideChildrenWhenHeaderHidden: false,
            },false)}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              withIcon: false,
              compactHeader: true,
              headerBorderBottom: false,
              icon: <CardBadge icon={<CheckS />} status="success" />,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<FilterM />} />{' '}
                  </Button>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<SearchM />} />{' '}
                  </Button>
                </div>
              ),
              showSideChildrenWhenHeaderHidden: false,
            },false)}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              withIcon: false,
              description: null,
              compactHeader: true,
              headerBorderBottom: true,
              showSideChildrenWhenHeaderHidden: false,
            },false)}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} />,
              headerBorderBottom: false,
              headerSideChildren: (
                <div>
                  <Button>Define</Button>
                </div>
              ),
            },false)}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} />,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
                  <Button type="ghost">Cancel</Button>
                  <Button type="custom-color" color="green">
                    Apply
                  </Button>
                </div>
              ),
            },false)}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} />,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
                  <Button type="custom-color" color={'yellow'}>
                    Skip step
                  </Button>
                  <Button>Define</Button>
                </div>
              ),
            },false)}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} status="success" />,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                  <Button>Change</Button>
                </div>
              ),
            },false)}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              disabled: true,
              icon: <CardBadge icon={<CheckS />} />,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                  <Button>Change</Button>
                </div>
              ),
              showSideChildrenWhenHeaderHidden: false,
            },false)}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              withIcon: 'UserM',
              iconColor: theme.palette['grey-400'],
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                  <Button>Change</Button>
                </div>
              ),
            },false)}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: false,
              raised: false,
              compactHeader: false,
              withIcon: 'UserM',
              iconColor: theme.palette['grey-400'],
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridColumnGap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      component={<WarningFillM />}
                      color={theme.palette['yellow-600']}
                      style={{ marginRight: '4px' }}
                    />
                    <span style={{ fontWeight: 500, color: theme.palette['yellow-600'] }}>Uncompleted</span>
                  </div>
                  <Button type="custom-color" color="green" disabled>
                    Apply
                  </Button>
                </div>
              ),
              showSideChildrenWhenHeaderHidden: false,
            } ,false)}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: false,
              raised: false,
              description: null,
              compactHeader: false,
              icon: <Icon component={<UserM />}  style={{marginTop:'3px'}}/>,
              iconColor: theme.palette['grey-400'],
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridColumnGap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      component={<WarningFillM />}
                      color={theme.palette['yellow-600']}
                      style={{ marginRight: '4px'}}
                    />
                    <span style={{ fontWeight: 500, color: theme.palette['yellow-600'] }}>Uncompleted</span>
                  </div>
                  <Button type="custom-color" color="green" disabled>
                    Apply
                  </Button>
                </div>
              ),
              showSideChildrenWhenHeaderHidden: false,
            }, false)}
          </S.HeaderWrapper>
        </div>
      </div>
    );
  },
  group: () => {
    const { props } = init();
    const itemsInGroup = number('Number of cards rendered', 9);
    const rowItems = number('Items per row', 3);

    return (
      <div style={{ padding: 24, width: '100%', position: 'absolute', top: 0, left: 0, height: '100%' }}>
        <h3>Card Group</h3>
        <div style={{ padding: '12px 0', width: '100%' }}>
          <CardGroup columns={rowItems}>
            {range(0, itemsInGroup).map((i) => (
              <div key={i}>{renderCard({ ...props, icon: <CardBadge icon={<CheckS />} /> })}</div>
            ))}
          </CardGroup>
        </div>
      </div>
    );
  },
};

export default {
  name: 'Card/Card',
  stories,
  Component: Card,
};
