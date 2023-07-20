import React, { FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../constructor-item/constructor-item.module.css';
import { DELETE_INGREDIENT } from '../../services/actions/constructor';
import { DECREASE_COUNT } from '../../services/actions/ingredients';

type Props = {
  name: string;
  price: number;
  uuid: string;
  _id: string;
  image: string;
  index: number;
  moveListItem(dragIndex: number, hoverIndex: number): void;
}

const ConstructorItem: FC<Props> = ({ name, price, image, uuid, _id, moveListItem, index }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      uuid
    });
    dispatch({
      type: DECREASE_COUNT,
      id: _id
    });
  };

  const [{isDragging}, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const [, dropRef] = useDrop({
      accept: 'item',
      hover: (item: { index: number }, monitor) => {
        const dragIndex: number = item?.index;
        const hoverIndex: number = index;
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        //@ts-ignore
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        //@ts-ignore
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

        moveListItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    })
  
    const dragDropRef: any = dragRef(dropRef(ref));
    const opacity: number = isDragging ? 0 : 1;

  return (
    <div className={style.item} ref={dragDropRef} style={{opacity}}>
      <div className='mr-3' >
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleDeleteClick}
      > 
      </ConstructorElement>
    </div>
  )
}

export default ConstructorItem;
