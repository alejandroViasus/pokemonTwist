import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { variables } from '../../../assets/variables'
import { useSelector } from 'react-redux';

import SelectroIcon from '../../Icons/SelectroIcon';

function NavMenu({ switchMenu = true, missOperation }) {
  const navigate = useNavigate();
  const userState = useSelector(state => state.you.user);
  const redirectTo = (redirect) => {
    navigate(`/${userState.gametag}/${redirect}`, { replace: true });
  }

  const handleHover = (name = "card", hover = 0) => {

    let bgColor = ""
    if (hover === 1) {
      bgColor = "rgba(120,195,237,1)"
    } else {
      bgColor = "rgba(208,255,255,1)"
    }
    console.log("Hover!", name, hover);
    const d = document
    const icon = d.getElementById(`icon-${name}`);

    if (icon !== null && icon !== undefined && hover === 1) {
      //icon.style.fill = "red";
      //icon.style.position = "relative";
      //icon.style.left = "20px";
      //icon.style.scale = "1.6";
      icon.style.fill = bgColor;
      icon.style.opacity = "0.3";
      icon.style.transition = "all 0.3s";
    } else {
      //icon.style.fill = "blue";
      //icon.style.position = "relative";
      //icon.style.left = "0px";
      //icon.style.scale = "1";
      icon.style.fill = bgColor;
      icon.style.opacity = "1";
      icon.style.transition = "all 0.3s";
    }
  };

  return (
    <div className='content-nav-menu'>

      {variables?.navMenuOptions.map((option) => {
        return <div
        //!------------------------
        className="option-menu"
        //!------------------------
          key={`menuOption${option[0]}`}
          name={option[1]}
          onMouseEnter={() => { handleHover(option[1], 1) }}
          onMouseLeave={() => { handleHover(option[1], 0) }}
          onClick={() => {
            if (switchMenu) {
              redirectTo(option[1])
            } else {
              missOperation(() => redirectTo(option[1]));
            }
          }
          }>
          <div className="icon-selector">
            <SelectroIcon icon={option[1]} color={"rgba(208,255,255,1)"} />
          </div>

          <div className="icon-count">
            {option[1] === "box" && <div className="count">{`${userState.box}`}</div>}
            {option[1] === "travel" && <div className="count">{`${userState.tickets}`}</div>}
          </div>
          <div className="text"> {option[0]}</div>
        </div>
      })}

    </div>
  )
}

export default NavMenu