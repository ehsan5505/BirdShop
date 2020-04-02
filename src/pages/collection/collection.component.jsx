import React from "react";
import {connect} from 'react-redux';

import "./collection.styles.scss";
import { selectCollection } from '../../redux/shop/shop.selector';

const CollectionPage = ({ collection }) => {
  console.info(collection);
  return (
    <div className="collection-page">
        <h2>Welcome To {collection.title}</h2>
    </div>
  )
};

const mapStateToProps = (state,ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state) 
});

export default connect(mapStateToProps)(CollectionPage);
