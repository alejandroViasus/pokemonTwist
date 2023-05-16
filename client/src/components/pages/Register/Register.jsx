import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { variables } from '../../../assets/variables';

//!components

import LoginButton from '../../components/ButtonsLogin/LogOutButton';

function Register() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const actualDate = `${year}-${month}-${day}`;
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const images = variables.imagesTrainers;

    const [state, setState] = useState(variables.initialState.user);

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const onClick = (e) => {
        setState({ ...state, [e.currentTarget.dataset.name]: e.currentTarget.dataset.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (
            state.gametag?.length > 4 &&
            state.gametag?.length < 15 &&
            state.gametag[0] !== " " &&
            state.gametag !== undefined &&
            state.gametag !== "invitado" &&
            state.birthDay !== actualDate&&
            state.phone?.toString().length>6&&
            state.phone?.toString().length<12
        ) {
            console.log("Acces_Validations")
            try {
                const response = await fetch(`http://localhost:9000/api/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state),
                });

                if (response.ok) {
                    // La solicitud fue exitosa
                    console.log('Registro exitoso');
                    
                    navigate(`/${state.gametag}/home`, { replace: true });
                } else {
                    // La solicitud no fue exitosa
                    console.log('Error al enviar la solicitud');
                    navigate('/error', { replace: true }); // Reemplaza '/error' con la ruta adecuada para mostrar un mensaje de error
                }
            } catch (error) {
                console.log('Error al enviar la solicitud:', error);
                navigate('/error', { replace: true }); // Reemplaza '/error' con la ruta adecuada para mostrar un mensaje de error
            }
        } else {
            console.log("Datos incompletos", state)

            console.log("state.gametag !== invitado", state.gametag !== "invitado");
            console.log(`state.birthDay!==actualDate ${actualDate}`, state.birthDay !== actualDate);

        }

    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        } else {
            let gametag0 = "";
            if (user.gametag !== "invitado") {
                gametag0 = user.gametag;
            }
            if(gametag0===undefined){
                const name=document.getElementById("trainerName");
                console.log("name",name.value);
                if(name.value!==undefined){
                    gametag0=name.value;
                }else{
                    gametag0="";
                }
            }
            setState({
                ...state,
                email: user.email,
                gametag: gametag0,
            });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="section-form">
                    <label className='label-input' htmlFor="trainerName">Name Trainer</label>
                    <input className='value-input' type="text" id="trainerName" name="gametag" onChange={onChange} />
                </div>
                <div className="section-form">
                    <label className='label-input' htmlFor="labelInput">AgeTrainer</label>
                    <input className='value-input' type="date" id="trainerBirthDay" name="birthDay" onChange={onChange} />
                </div>
                <div className="section-form">
                    <label className='label-input' htmlFor="labelInput">AgeTrainer</label>
                    <input className='value-input' type="number" id="trainerPhone" name="phone" onChange={onChange}  />
                    
                </div>
                <div className="gametagTrainer">
                    <label htmlFor="trainerImage">Trainer Image</label>
                    <div className="images-trainer">
                        {images.map((image, index) => (
                            <div className="image-trainer" key={`image-${index}`} onClick={onClick} data-value={image} data-name="pictureTrainer">
                                <img src={image} alt={`Trainer Image ${index}`} style={{ height: "25px", width: "25px" }} />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn">CreateCount</button>
            </form>

            <div className="cardUser">
                <div>{state.gametag}</div>
                <div className="image-user">
                    <img src={state.pictureTrainer} alt={`set Trainer Image `} style={{ height: "50px", width: "50px" }} />
                </div>

            </div>
            <LoginButton text="return" />
        </div>

    );
}

export default Register;
