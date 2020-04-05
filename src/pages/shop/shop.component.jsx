import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { firestore,GetCollectionSnapshot } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";


class ShopPage extends React.Component {
  unsubscribeFromSnapshot = false;

  componentDidMount(){

    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      const collectData = GetCollectionSnapshot(snapshot);
      updateCollections(collectData); 
    })
    
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact={true}
          path={`${match.path}`}
          component={CollectionOverview}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapStateToDispatch = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null,mapStateToDispatch)(ShopPage);
