import { useCallback, useEffect, useState } from "react"

import CardImage from "./components/CardImage"
import { Space } from 'antd'
import { computeProOne } from "./context/logic"
import { useAutoAnimate } from '@formkit/auto-animate/react'

function App() {
  const [num, setNum] = useState(-1)
  const [data, setData] = useState<any[]>([])
  const [parent] = useAutoAnimate(/* optional config */)
  const [intervalId, setIntervalId] = useState<any>(null);
  const [total, setTotal] = useState(0)

  const [current, setCurrent] = useState<any[]>([])

  const cardProps = ({ quantity, item }: Record<string, any>) => {
    return {
      cover: <img alt="example" src={item.src} style={{ width: '100%', height: '100%' }} />,
      title: item.name,
      description: quantity,
      style: {
        width: 250,
        height: 500,
      }
    }
  }

  const clearTimer = useCallback(() => {
    clearInterval(intervalId)
    setIntervalId(null)
  }, [intervalId])



  useEffect(() => {
    if (data.length === num) {
      clearTimer()
    }
  }, [clearTimer, data, num])

  const startInterval = (num) => {
    // 避免启动多个定时器
    if (!intervalId) {
      const newIntervalId = setInterval(() => {
        // 判断data长度是否达到10，如果是则停止定时器
        if (data.length >= num) {
          clearTimer()
        } else {
          setData((prevData) => [...prevData, prevData.length]);
        }
      }, 1000);

      setIntervalId(newIntervalId);
    }
  };

  function handleOne() {
    data.length = 0
    setNum(1)
    setTotal(total + 1)
    startInterval(1)
    current.push(computeProOne())
    setCurrent(current)
    console.log(current);

  }

  function handleTen() {
    current.length = 0
    data.length = 0
    setTotal(total + 10)
    setNum(10)
    startInterval(10)
    for (let i = 0; i < 10; i++) {
      current.push(
        computeProOne()
      )
    }
    setCurrent(current)
    console.log(current);
  }

  return (
    <>
      <h3 className="text-center text-24px font-bold my-10px">三月抽卡姬</h3>
      <div className='flex flex-col w-1300px mx-auto text-center color-white min-h-1008px'>
        <main className="flex flex-justify-center">
          <Space ref={parent} wrap>
            {
              data.map((i, index) => {
                return (
                  <CardImage key={i}  {...cardProps(current[index].currentCard)} quantity={current[index].currentCard.quantity} />
                )
              })
            }
          </Space>
        </main>


      </div>

      <div>
        当前抽数:{total}
      </div>

      {/* 按扭区  */}
      <div className='inline-flex p-2 w-full'>
        <button className="btn btn-accent mr-10px w-1/2" onClick={handleOne}>抽取一次</button>
        <button className="btn btn-warning w-1/2" onClick={handleTen}>抽取十次</button>
      </div>


    </>
  )
}

export default App
