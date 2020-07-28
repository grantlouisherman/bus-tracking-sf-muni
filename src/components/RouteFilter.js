import React from "react";

const sideBarStyle = {
  padding: 0,
  width: "70%",
  overflow: 'scroll',
  position: "absolute",
  top: "50%",
  "margin-right": "-60%",
  "margin-bottom": "-10%"
};
const RouteFilter = ( { markers, tags, clickHandler } ) => (
    <div className='row'>
    <div className='col' style={sideBarStyle}>
    <ul class="list-group list-group-horizontal" >
      <li className="list-group-item disbaled">Route Filter</li>
      {tags && tags.map(tag =>
        <li onClick={clickHandler}
        key={tag}
        id={tag}
        className="list-group-item active">
        {markers[tag] && markers[tag].title}
        </li>)}
    </ul>
    </div>
    </div>
  );

export default RouteFilter;
/*
"list-group-item"

*/
