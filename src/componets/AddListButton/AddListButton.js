import React, { useState, useEffect } from 'react';
import axios from 'axios'


import List from '../List/List';
import Badge from '../Badge/Badge';

import './AddListButton.scss'
import addSvg from '../../assets/img/add.svg'
import closeSvg from '../../assets/img/close.svg'



const Addlistbutton = ({ colors, onAdd }) => {
    const [visiblePopup, setvisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(1);
    const [isLoading, setisLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id)
        }

    }, [colors])

    const onClose = () => {
        setInputValue('')
        setvisiblePopup(false)
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка.')
            return
        }
        setisLoading(true)
        axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor, })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name
                const listObj = { ...data, color: { name: color } }
                console.log(listObj);
                onAdd(listObj)
                setisLoading(false)
                onClose()
            })

    }







    return (
        <div className='add__list'>

            <List
                onClick={() => setvisiblePopup(!visiblePopup)}
                items={[
                    {
                        className: "list__add-button",
                        icon: <img src={addSvg} alt="list icon" />,
                        name: "Добавить список",

                    },
                ]} />

            {visiblePopup && <div className="add__list-popup">

                <img
                    className="add__list-popup--close"
                    src={closeSvg}
                    alt="close"
                    onClick={onClose}
                />
                <input
                    onChange={(e) => { setInputValue(e.target.value) }}
                    value={inputValue} placeholder='Название папки' className="field" type="text" />
                <div className="add__list-popup-colors">
                    <ul>
                        {
                            colors.map(color => {
                                return (
                                    <li key={color.id}>{

                                        <Badge
                                            color={color.name}
                                            onClick={() => setSelectedColor(color.id)}
                                            className={selectedColor === color.id && 'active'}
                                        />
                                    }</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button onClick={addList} className='button'> {isLoading ? 'Добавляется.....' : 'Добавить'}</button>
            </div>}
        </div>
    );
}

export default Addlistbutton;
