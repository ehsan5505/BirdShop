import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded
} from "../../redux/shop/shop.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;

    fetchCollectionStartAsync();
  }

  render() {
    const { match, isFetching,collectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact={true}
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={isFetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={props => (
            <CollectionPageWithSpinner isLoading={!collectionLoaded} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching,
  collectionLoaded: selectIsCollectionLoaded 
});

const mapStateToDispatch = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(mapStateToProps, mapStateToDispatch)(ShopPage);
