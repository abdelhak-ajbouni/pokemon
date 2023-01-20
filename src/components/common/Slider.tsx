import React, { useState, ReactNode } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';

const MAX_VISIBLE = 2;

export default function Slider({ children }: Props) {
  const items = React.Children.toArray(children);
  const width = 200 * (MAX_VISIBLE * 2) + 200;
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current === items.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current === 0) {
      setCurrent(items.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const renderExtraPrev = () => {
    let output = []
    for (let i = 0; i < MAX_VISIBLE; i++) {
      if (current - 1 - i < 0) {
        output.push(items[items.length + current - 1 - i])
      } else {
        output.push(items[current - 1 - i])
      }
    }
    output.reverse()
    return output.map((item, index) => getListItem(index, item))
  }

  const renderExtraNext = () => {
    let output = []
    for (let i = 0; i < MAX_VISIBLE; i++) {
      if (current + 1 + i >= items.length) {
        output.push(items[current + 1 + i - items.length])
      } else {
        output.push(items[current + 1 + i])
      }
    }
    return output.map((item, index) => getListItem(index, item))
  }

  const getListItem = (index: number, item: ReactNode, classes?: string) => {
    return (
      <li
        key={index}
        className={'border p-4 w-[200px] inline-block ' + classes}
      >
        {item}
      </li>
    )
  }


  return (
    <div className="slider overflow-hidden">
      <ul
        style={{
          width: width + 'px',
        }}
      >
        {
          renderExtraPrev()
        }
        {items.map((item, index) => {
          let classes = 'hidden';

          if (index === current) {
            classes = 'border-red-200 active';
          }

          return getListItem(index, item, classes)
        })}
        {
          renderExtraNext()
        }
      </ul>
      <div>
        <button onClick={handlePrev}>
          <TiChevronLeftOutline />
        </button>
        <button onClick={handleNext}>
          <TiChevronRightOutline />
        </button>
      </div>
    </div >
  );
};

type Props = {
  children: ReactNode;
}