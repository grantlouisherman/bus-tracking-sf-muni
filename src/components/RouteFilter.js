import React from "react";

const sideBarStyle = {
  padding: 0,
  width: "500px",
  height: "500px",
  overflow: 'scroll'
};
const RouteFilter = ( { tags, clickHandler } ) => {
  return (
    <div style={sideBarStyle}>
    <h4> Route Filter</h4>
    <ul class="list-group list-group-horizontal" >
      {tags && tags.map(tag =>
        <li onClick={clickHandler}
        key={tag}
        className="list-group-item active">
        {tag}
        </li>)}
    </ul>
    </div>
  );
};

export default RouteFilter;
/*
"list-group-item"

*/
