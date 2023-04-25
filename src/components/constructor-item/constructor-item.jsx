import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../constructor-item/constructor-item.module.css';
import { DELETE_INGREDIENT } from '../../services/actions/constructor';
import { DECREASE_COUNT } from '../../services/actions/ingredients';

function ConstructorItem({ name, price, image, uuid, _id, moveListItem, index }) {
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
  
  const [, dropRef] = useDrop({
      accept: 'item',
      hover: (item, monitor) => {
        const dragIndex = item.index;
        const hoverIndex = index;
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

        moveListItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    })
  
    const ref = React.useRef(null)
    const dragDropRef = dragRef(dropRef(ref));
    const opacity = isDragging ? 0 : 1;

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

ConstructorItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveListItem: PropTypes.func.isRequired
};