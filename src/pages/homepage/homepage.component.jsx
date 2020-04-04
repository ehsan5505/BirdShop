import React from 'react';
// import './homepage.styles.scss'
import {HomePageContainer} from './homepage.styles';

import Directory from '../../components/directory-menu/directory.component';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
    // <div className="homepage"></div> /* Homepage div ends here */
)

export default HomePage;