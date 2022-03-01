import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { Link } from 'react-router-dom';
import { setError,removeError } from '../../actions/ui' 
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => { 

  const dispatch = useDispatch();

  //Codigo para verificar si es correcto en caso contrario se manda llamar al id
  const {msgError,loading} = useSelector(state => state.ui);
  

  //Inicializo los datos usando el form que se creo
  const [ formValues, handleInputChange ] = useForm({
      email: 'javier@gmail.com',
      password: '123456'
  });

  //Desgloso los datos para poder usarlos donde desee
  const { email, password } = formValues;

  const handleLogin= (e)=>{
    //El e.preventDefault sirve como un trycatch
    e.preventDefault();

    if( isFormValid()){
      dispatch( startLoginEmailPassword(email,password));
    }
  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin());
  }

  //Codigo para verificar el formulario
  const isFormValid = ()=>{

    if( !validator.isEmail(email)){
      dispatch(setError('Email is not valid'));
      return false;
    }else if( password.trim().length==0){
      dispatch(setError('Password is required'));
      return false;
    }

    dispatch(removeError());
    return true
  }


  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        { msgError &&
          <div className="auth__alert-error">
            {msgError}
          </div>
        }
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={ email }
          onChange={ handleInputChange }        
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={ password }
          onChange={ handleInputChange }
        />
        <button 
          className="btn btn-primary btn-block"
          type="submit"
          disabled={ loading }
          
        >
          Login
        </button>
        <hr/>
        <div className="auth_social-networks">
            <p>Login with social networks</p>
            <div 
                className="google-btn"
                onClick={handleGoogleLogin}
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>
        </div>

        <Link 
        className="link"
        to="/auth/register">
          Create new Accountant
        </Link>

      </form>
    </>
  )
}

