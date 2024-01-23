import { Card, CardProps } from 'antd';

import React from 'react';

const { Meta } = Card;

export interface CardImageProps extends CardProps {
  description?: string
  quantity?: 'blue' | 'violet' | 'gold'
}

const App: React.FC<CardImageProps> = (props) => {

  const { quantity, cover, title, ...rest } = props

  return (
    <Card
      className={`${quantity ? quantity + '-card' : ''}`}
      hoverable
      cover={cover}
      {...rest}
    >
      <Meta
        title={<h3 className={`color-${quantity === 'gold' ? 'red' : 'white'} font-bold za text-25px`}>{title}</h3>}
      />
    </Card>
  )
};

export default App;