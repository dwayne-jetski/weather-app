import { useState } from 'react';


const useForm = (callback) => {

    const [values, setValues] = useState({});

    const handleChange = (event) =>{
        
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
        console.log(values)
    }

    const handleSubmit = (event) =>{

        event.preventDefault();
        console.log(values);
        callback();
    }

    return { values, handleChange, handleSubmit }

};

export default useForm;