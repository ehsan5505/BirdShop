import React from 'react';
import SHOP_DATA from './Shop_data';

class ShopPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            collection : SHOP_DATA
        }
    }

    render(){
        return "<div>Happy Shopping!</div>"
    }

}

export default ShopPage;
