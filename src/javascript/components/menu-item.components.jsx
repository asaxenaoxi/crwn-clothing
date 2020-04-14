import React from 'react';

import { withRouter } from 'react-router-dom';
//This import is used to super charge the component to have access to history, location and match properties of the Route for any component
//React only makes available these properties to the first child component which in this case is HomePage, after that, we would need to pass
//or tunnel the properties through every component down the chain. In this example, HomePage->Directory->MenuItem. But we do not need these
//properties in Directory so why pass it to Directory and hence we super charge MenuItem with withRouter() and allow it access directly 
//without getting it passed down the chain to it.

import '../../styles/menu-item.styles.scss';

const MenuItem = (props) => (
    <div 
        className={`${props.size} menu-item`}
        onClick={() => props.history.push(`${props.match.url}${props.linkUrl}`)}>

        <div className='background-image'
            style={{backgroundImage: `url(${props.imageUrl})`}}></div>
        
        <div className='content'>
            <h1 className='title'>{props.title.toUpperCase()}</h1>
            <span className='subtitle'>{props.subtitle.toUpperCase()}</span>
        </div>
        
    </div>
)

export default withRouter(MenuItem);