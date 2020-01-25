import React from 'react';

import './directory.styles.scss';
import MenuItem from '../menu-item/menuitem.component';

class Directory extends React.Component {

    constructor(){
        super();

        this.state = {
            sections: [
                {
                    id:1,
                    title: 'Medicines',
                    imageUrl: 'https://cdn11.bigcommerce.com/s-fa708/images/stencil/1280x1280/products/703/2648/Vetafarm_Probotic-90g1__83500.1502986111.jpg?c=2?imbypass=on'
                },
                {
                    id:2,
                    title: 'Feeds',
                    imageUrl: 'https://i.ytimg.com/vi/0Yqw22VCII4/maxresdefault.jpg'
                },
                {
                    id:3,
                    title: 'Cages',
                    imageUrl: 'https://apollo-singapore.akamaized.net/v1/files/fxifqda6pj14-PK/image;s=850x0'
                },
                {
                    id:4,
                    title: 'Birds',
                    imageUrl: 'https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Cockatiel-2-300x300.jpg'
                },
                {
                    id:5,
                    title: 'Pets',
                    imageUrl: 'https://www.fajarmag.com/wp-content/uploads/2018/12/pets_and_money_hero_image_-_minus_guinea.png'
                }
            ]
        }
    }
    
    render() {
        return (
            <div className='directory-menu'>
                {this.state.sections.map(({ id, title, imageUrl }) => (
                    <MenuItem key={id} title={title} image={imageUrl} />
                ))}
            </div>
        );
    }
}

export default Directory;