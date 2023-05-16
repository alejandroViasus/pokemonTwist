import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initialUser } from '../../../redux/actions';
import { Outlet, useNavigate } from 'react-router-dom';

function HomeLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gametag } = useParams();
  const userState=useSelector(state=>state);
  useEffect(() => {
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
  }, [dispatch, gametag]);

  

  console.log(userState)
  return (
    <div>HomeLogin {gametag} {userState.user.email}</div>
  );
}

export default HomeLogin;
