const INTIAL_STATE = {
    sections: [
        {
            id: 1,
            title: 'Medicines',
            imageUrl: 'https://cdn11.bigcommerce.com/s-fa708/images/stencil/1280x1280/products/703/2648/Vetafarm_Probotic-90g1__83500.1502986111.jpg?c=2?imbypass=on',
            linkUrl: '/shop/medi'
        },
        {
            id: 2,
            title: 'Feeds',
            imageUrl: 'https://i.ytimg.com/vi/0Yqw22VCII4/maxresdefault.jpg',
            linkUrl: '/shop/feed'
        },
        {
            id: 3,
            title: 'Cages',
            imageUrl: 'https://apollo-singapore.akamaized.net/v1/files/fxifqda6pj14-PK/image;s=850x0',
            linkUrl: '/shop/cage'
        },
        {
            id: 4,
            title: 'Birds',
            imageUrl: 'https://cache.desktopnexus.com/thumbseg/2351/2351311-bigthumbnail.jpg',
            linkUrl: '/shop/bird'
        },
        {
            id: 5,
            title: 'Pets',
            imageUrl: 'https://www.fajarmag.com/wp-content/uploads/2018/12/pets_and_money_hero_image_-_minus_guinea.png',
            linkUrl: '/shop/pets'
        }
    ]
}

const directoryReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default directoryReducer;