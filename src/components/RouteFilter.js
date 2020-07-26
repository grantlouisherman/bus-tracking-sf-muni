import React from "react";

const sideBarStyle = {
  float: "right",
  margin: 0,
  padding: 0,
  width: "200px",
  height: "500px",
  overflow: 'scroll'
};
const RouteFilter = ( { tags, clickHandler } ) => {
  return (
    <div style={sideBarStyle}>
    <h4> Route Filter</h4>
    <ul class="list-group" >
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
