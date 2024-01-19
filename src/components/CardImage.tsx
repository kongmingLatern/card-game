import { Card, CardProps } from 'antd';

import React from 'react';

const { Meta } = Card;

export interface CardImageProps extends CardProps {
  description?: string
}


const App: React.FC<CardImageProps> = (props) => {

  const { cover, title, description, ...rest } = props

  return (
    <Card
      hoverable
      cover={cover}
      {...rest}
    >
      <Meta title={title} description={description} />
    </Card>
  )
};

export default App;