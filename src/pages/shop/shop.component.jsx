import React from "react";
import { Route } from "react-router-dom";
import { firestore,GetCollectionSnapshot } from '../../firebase/firebase.utils';

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";


class ShopPage extends React.Component {
  unsubscribeFromSnapshot = false;

  componentDidMount(){
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      GetCollectionSnapshot(snapshot) 
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

export default ShopPage;
