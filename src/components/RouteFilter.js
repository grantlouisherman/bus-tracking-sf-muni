import React from "react";

const sideBarStyle = {
  float: "right",
  margin: 0,
  padding: 0,
  width: "200px",
  height: "50%",
  overflow: 'scroll'
};

const RouteFilter = ({ tags }) => {
  const clickHandler = evt => {
    console.log(evt.target.innerText)
    const classList = evt.target.classList;
    if(classList.contains('active')){
      classList.remove('active');
    }else{
      classList.add('active');
    }

  }
  return (
    <div style={sideBarStyle}>
    <h4> Route Filter</h4>
    <ul class="list-group" >
      {tags && tags.map(tag =>
        <li onClick={clickHandler}
        key={tag}
        className="list-group-item">
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
