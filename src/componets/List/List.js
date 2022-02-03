import React from 'react';
import axios from 'axios'
import classNames from 'classnames';

import Badge from '../Badge/Badge';


import './list.scss';
import remaveSvg from '../../assets/img/remove.svg'




const List = ({ items, isRemovable, onClick, onRemove }) => {


    const removeList = item => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            //axios сам сравнивает и находит id мы передаем каой id нам нужен и удаляем его из списка
            //если все гуд то вызывакем .then
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)

            })
        }

    }


    const liBlocks = items.map(item => {
        return (
            <li key={1 + item.name} className={classNames(item.className, { 'active': item.active })}>
                <i>{item.icon ? item.icon : <Badge color={item.color !== undefined ? item.color.name : null} />}</i>
                <span>{item.name}</span>
                {
                    isRemovable && <img
                        onClick={() => removeList(item)}
                        className='list__remove-icon'
                        src={remaveSvg}
                        alt="del"
                    />
                }

            </li >
        )
    })

    return (
        <ul className="list" onClick={onClick}>
            {liBlocks}
        </ul>
    );
}

export default List;
