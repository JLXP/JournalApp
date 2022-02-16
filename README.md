import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];
}

npm install react-router-dom
npm instal react-redux redux


https://github.com/zalmoxisus/redux-devtools-extension#usage
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


npm install firebase@8.10.0

npm install --save redux-thunk

//https://www.npmjs.com/package/validator es para validar el email

npm i validator

