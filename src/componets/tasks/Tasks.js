import React from 'react';


import './tasks.scss'
import editSvg from '../../assets/img/edit.svg'



const Tasks = ({ list }) => {
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list !== undefined && list.name}
                <img src={editSvg} alt="Редактировать" />
            </h2>
            <ul className="tasks__items">
                {
                    list.tasks.map(el => {
                        return (
                            <li key={el.id} className="tasks__item">
                                <input className="tasks__item-checkbox" type="checkbox" id={`task-${el.id}`} />
                                <label htmlFor={`task-${el.id}`} className="tasks__item-label">
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </label>
                                <input

                                    className="tasks__item-text"
                                    value={el.text}
                                    type="text"
                                />

                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Tasks;
