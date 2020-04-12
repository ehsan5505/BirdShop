import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import WithSpinner from "./../with-spinner/with-spinner.component";
import CollectionOverview from "./collection-overview.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

export default compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);
