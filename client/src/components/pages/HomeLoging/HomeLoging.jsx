import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate} from 'react-router-dom';
import { initialUser } from '../../../redux/actions';

//!components
import NavMenu from '../../components/NavMenu/NavMenu';
import NavBar from '../../components/NavBar/NavBar';

function HomeLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gametag } = useParams();
  const userState = useSelector(state => state);

  useEffect(() => {
    console.log("EstadoModificado");
    console.log('Valor de gametag:', gametag);
    fetch(`http://localhost:9000/api/users/gametag/${gametag}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(initialUser(data));
      })
      .catch((error) => {
        console.log('Error al obtener los datos:', error);
        navigate(`/`, { replace: true });
      });
  }, [dispatch, gametag, userState.box]);

  // useEffect(() => {
  //   if (gametag !== userState.gametag) {
  //     console.log("usuario indeterminado");
  //     navigate(`/`, { replace: true });
  //   }
  // }, [userState]);

  return (
    <div>
      <div className="place-menu-nav">
        <NavMenu />
      </div>

      <div className="body-login-home">
        <div className="place-NavBar">
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;
