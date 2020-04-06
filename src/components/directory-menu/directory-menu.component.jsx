import React from 'react';
import MenuItem from '../menu-item/menu-item.components';
import './directory-menu.styles.scss';

class DirectoryMenu extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            selections : 
            [
                {
                    title: 'HATS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                    linkUrl: 'hats',
                    id: 1
                },
                {
                    title: 'JACKETS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                    linkUrl: 'jackets',
                    id: 2
                },
                {
                    title: 'SNEAKERS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    linkUrl: 'sneakers',
                    id: 3
                },
                {
                    title: 'WOMENS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    linkUrl: 'womens',
                    size: 'large',
                    id: 4
                },
                {
                    title: 'MENS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    linkUrl: 'men',
                    size: 'large',
                    id: 5
                }
            ]
        }
    }

    render() {
        return (
        <div className='directory-menu'>
            {
                //this.state.selections.map((selection) => (
                //OR this.state.selections.map(({title, subtitle, imageUrl, linkUrl, size, id}) => (
                //Now that we need to pass a lot of variables with same name as props, we can use a shortcut and for that we need to deconstruct selection
                //we only deconstruct id explicitly because we store it as id and the component is expecting it as key prop
                this.state.selections.map(({id, ...otherSectionProps}) => (    
                <MenuItem 
                    /*title={selection.title}
                    subtitle={selection.subtitle}
                    imageUrl={selection.imageUrl}
                    size={selection.size != null ? selection.size : ''}*/
                    key={id}
                    {...otherSectionProps}
                />
                ))
            }
        </div>
        )//end of return
    }
}

export default DirectoryMenu;