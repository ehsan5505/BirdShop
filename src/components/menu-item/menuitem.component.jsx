import React from 'react';

import './menuitem.styles.scss';

const MenuItem = ({title, image}) => {
    return (
        <div className='menu-item'>
            <div className='background-image' style={{backgroundImage:`url(${image})`}} />
            <div className='content'>
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='subtite'>SHOP NoW!</span>
            </div>
        </div>
    )
}

export default MenuItem;