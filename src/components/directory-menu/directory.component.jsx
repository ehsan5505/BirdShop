import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directory.selector";

import "./directory.styles.scss";
import MenuItem from "../menu-item/menuitem.component";

const Directory = ({sections}) => (
  <div className="directory-menu">
    {sections.map(({ id, title, imageUrl }) => (
      <MenuItem key={id} title={title} image={imageUrl} />
    ))}
  </div>
);
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
