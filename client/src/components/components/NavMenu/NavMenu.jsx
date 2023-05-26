import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { variables } from '../../../assets/variables'
import { useSelector } from 'react-redux';

function NavMenu({ switchMenu = true ,missOperation}) {
  const navigate = useNavigate();
  const userState = useSelector(state => state.user);
  const redirectTo = (redirect) => {
    navigate(`/${userState.gametag}/${redirect}`, { replace: true });
  }

  return (
    <div>
      <div className="s">------------------------------------------------</div>
      {variables?.navMenuOptions.map((option) => {
        return <div key={`menuOption${option[0]}`} className="option-menu" onClick={() => {
          if (switchMenu) {
            redirectTo(option[1])
          }else{
            missOperation(()=>redirectTo(option[1]));
          }
        }
      }>
          {option[0]}
          {option[1] === "box" && <div className="count">{`${userState.box}`}</div>}
          {option[1] === "expedition" && <div className="count">{`${userState.tickets}`}</div>}
        </div>
      })}
<div className="s">------------------------------------------------</div>
    </div>
  )
}

export default NavMenu