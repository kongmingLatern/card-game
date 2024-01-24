import { Drawer, Image, Space, message } from "antd";
import { useEffect, useState } from "react";

import CardImage from "./CardImage";

export default function DrawerImage(props) {

  const { open, setOpen, allList, current } = props
  const [isFinish, setFinish] = useState(false)

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const hasSelected = allList.every(list => {
      return current.some(c => {
        return c.currentCard.item.name === list.name
      })
    })
    if (hasSelected && current.length !== 0 && !isFinish) {
      // NOTE: 全收集
      message.success(`恭喜你,已经全图鉴啦!总抽数:${current.length}`)
      setFinish(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, allList])

  return (
    <Drawer
      title="图鉴一览"
      placement={'top'}
      onClose={onClose}
      open={open}
      key={'top'}
      height={1125}
    >
      <div className='flex flex-col w-1350px mx-auto text-center color-white min-h-1024px'>
        <main className="w-1350px min-h-1024px">
          <Space wrap size={'large'} className="w-1350px min-h-1024px">
            {
              allList.map((i, index) => {
                return <CardImage
                  key={index}
                  quantity={i.quantity}
                  cover={
                    <Image
                      alt="图片加载失败"
                      preview={current.find(c => c.currentCard.item.name === i.name) ? {
                        imageRender: (origin) => {
                          if (i.imageRender) {
                            return <Image src={i.imageRender || i.src} style={{ width: '80%', margin: '0 auto' }} preview={false} />
                          }

                          return origin
                        },
                        mask: <div>点击预览</div>,
                      } : false}
                      src={i.src}
                      style={{ width: '100%', height: '100%' }
                      }
                    />}
                  title={i.name}
                  style={
                    {
                      width: 250,
                      height: 500,
                      filter: current.find(c => c.currentCard.item.name === i.name) ? 'brightness(1) ' : 'brightness(0.5)'
                    }}
                />
              })
            }
          </Space>
        </main>
      </div>
    </Drawer>

  )
}