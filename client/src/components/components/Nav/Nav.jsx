import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import { Outlet, useNavigate } from 'react-router-dom';
import LogOutButton from '../ButtonsLogin/LogOutButton';
import LoginButton from '../ButtonsLogin/LogInbutton';

function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && !userState.app.loging) {
        //console.log("userAutenticated", user);
        try {
          const response = await fetch(`http://localhost:9000/api/users/email/${user.email}`);
          const data = await response.json();
          if (data.email === undefined) {
            console.log("userEmail", data.email);
            navigate("/register/trainer", { replace: true });
          } else {
            //console.log("dataDB",data)
            navigate(`/${data.gametag}/home`, { replace: true });
          }
        } catch (error) {
          console.log("Error fetching data:", error);
          navigate("/register/trainer", { replace: true });
        }
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated, user, userState.app.loging, navigate]);

  if (isLoading) return <h1>...Loading</h1>;

  return (
    <div className='content-nav'>
      <div className="info">
        <div className="user-principal">
          <div className='user-name'>{userState.gametag}</div>
          <div className='user-progress'>{/* Aquí puedes usar userState.experience para mostrar el progreso */}</div>
        </div>
        {isAuthenticated ? <LogOutButton /> : <LoginButton />}
        <div className="user-picture">
          <img className='picture' src={userState.pictureTrainer} alt="" />
        </div>
      </div>
      <Outlet /> 
    </div>
  );
}

export default Navbar;








// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useAuth0 } from '@auth0/auth0-react';
// import { login } from "../../../redux/actions";
// import LogOutButton from '../ButtonsLogin/LogOutButton';
// import LoginButton from '../ButtonsLogin/LogInbutton';

// function Navbar() {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state);

//   useEffect(() => {
//     if (isAuthenticated && !userState.app.loging) {
//         console.log("userAutenticated", user)
//         const response = await fetch(`http://localhost:9000/api/users/email/${user.email}`);
//       //dispatch(login(user.email, user.nickname, user.picture));
//     }
//   }, [dispatch, isAuthenticated, user, userState.loging]);

//   if (isLoading) return <h1>...Loading</h1>;

//   return (
//     <div className='content-nav'>
//       <div className="info">
//         <div className="user-principal">
//           <div className='user-name'>{userState.gametag}</div>
//           <div className='user-progress'>{/* Aquí puedes usar userState.experience para mostrar el progreso */}</div>
//         </div>
//         {isAuthenticated ? <LogOutButton /> : <LoginButton />}
//         <div className="user-picture">
//           <img className='picture' src={userState.pictureTrainer} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
