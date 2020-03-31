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
                    id: 1
                },
                {
                    title: 'JACKETS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 1
                },
                {
                    title: 'SNEAKERS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 1
                },
                {
                    title: 'WOMENS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    size: 'large',
                    id: 1
                },
                {
                    title: 'MENS',
                    subtitle: 'SHOP NOW',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    size: 'large',
                    id: 1
                }
            ]
        }
    }

    render() {
        return (
        <div className='directory-menu'>
            {
                this.state.selections.map((selection) => (
                <MenuItem 
                    title={selection.title}
                    subtitle={selection.subtitle}
                    imageUrl={selection.imageUrl}
                    size={selection.size != null ? selection.size : ''}
                    key={selection.id}
                />
                ))
            }
        </div>
        )//end of return
    }
}

export default DirectoryMenu;