import React from 'react';
import MenuItem from './menu-item.components';
import '../../styles/directory-menu.styles.scss';
import CONST_DS_MENU_ITEMS from '../data/directory-menu.data';

class DirectoryMenu extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            selections : CONST_DS_MENU_ITEMS
        }
    }

    render() {
        return (
        <div className='directory-menu'>
            {
                /*this.state.selections.map((selection) => (
                OR this.state.selections.map(({title, subtitle, imageUrl, linkUrl, size, id}) => (
                Now that we need to pass a lot of variables with same name as props, we can use a shortcut and for that we need to deconstruct selection
                we only deconstruct id explicitly because we store it as id and the component is expecting it as key prop*/
                
                /*title={selection.title}
                subtitle={selection.subtitle}
                imageUrl={selection.imageUrl}
                size={selection.size != null ? selection.size : ''}*/

                this.state.selections.map(({id, ...otherSectionProps}) => (    
                <MenuItem 
                    key={id}
                    {...otherSectionProps}
                />
                ))
            }
        </div>
        )
    }
}

export default DirectoryMenu;