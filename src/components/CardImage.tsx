import { Card, CardProps } from 'antd';

import React from 'react';

const { Meta } = Card;

export interface CardImageProps extends CardProps {
  description?: string
  quantity?: 'blue' | 'violet' | 'gold'
}

const App: React.FC<CardImageProps> = (props) => {

  const { quantity, cover, title, description, ...rest } = props

  return (
    <Card
      className={`${quantity ? quantity + '-card' : ''}`}
      hoverable
      cover={cover}
      {...rest}
    >
      <Meta
        title={<h3 className={`color-white font-bold`}>{title}</h3>}
        description={<p className='color-white'>{description}</p>}
      />
    </Card>
  )
};

export default App;