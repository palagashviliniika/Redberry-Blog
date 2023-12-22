import React, { useEffect, useState } from 'react'
import infoCircle from '../assets/infoCircle.png'
import api from '../api/posts'
import { useAuth } from '../Contexts/AuthContext'
import { Success } from './Success'

export const Login = ({onClose}) => {
    const { isLoggedIn, login, logout, isAuthenticated } = useAuth();
    const [isValidated, setIsValidated] = useState(null)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState(() => {
        const storedFormData = localStorage.getItem('loginData');
        return storedFormData ? JSON.parse(storedFormData) : { email: '' };
      });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        validate(formData.email)
    }

    const handlePostRequest = async () => {
        try {
            setLoading(true);
            const response = await api.post('/login', formData);
            console.log(response.status);
            login()
        } catch (err) {
            console.log(err);
            setError("ელ-ფოსტა არ მოიძებნა")
            setIsValidated(false)
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {
        if (isValidated === true) {
        //   console.log("sending post request");
        handlePostRequest();
        } else if (isValidated === false) {
          console.log("data is incorrect");
        }
      }, [isValidated]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        setIsValidated(null)
    }

    useEffect(() => {
        localStorage.setItem('loginData', JSON.stringify(formData));
    }, [formData])

    const validate = (email) => {
        const redberryRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.ge$/;

        if(!email) {
            setError("შეიყვანეთ ელ-ფოსტა")
            setIsValidated(false)
        } else if(!redberryRegex.test(email)) {
            setError("მეილი უნდა მთავრდებოდეს @redberry.ge-ით")
            setIsValidated(false)
        } else {
            setError('')
            setIsValidated(true)
        }
    }

    // useEffect(() => {
    //     console.log(isValidated, "1");
    // }, [isValidated])

    // useEffect(()=> {
    //     formData.email && validate(formData.email)
    //     console.log("asd");
    // }, [])

    return (
        <>
        {
            !isAuthenticated() ? (
            <>
                <h1 className='place-self-center font-bold text-2xl'>
                    შესვლა
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label 
                            htmlFor="email"
                            className='font-medium text-sm text-customBlack pt-6'
                        >
                            ელ-ფოსტა
                        </label>
                        <input 
                            type="email" 
                            name='email'
                            id='email'
                            placeholder='Example@redberry.ge'
                            value={formData.email}
                            onChange={handleChange}
                            className={`text-sm font-normal border ${isValidated === false ? 'border-border-error' : 'border-border'} rounded-xl py-3 px-4 ${isValidated === false ? 'bg-inputBG-error' : 'bg-inputBG'}  focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus`}
                        />
                        {
                            error &&
                                <div className='flex items-center'>
                                    <img src={infoCircle} alt="" />
                                    <p className='pl-2 text-customRed font-normal text-xs'>
                                        {error}
                                    </p>
                                </div>
                        }
                        <button
                            type='submit'
                            className='mt-4 font-medium text-white bg-customPurple rounded-lg px-5 py-2.5 text-sm'
                        >
                            შესვლა
                        </button>
                    </div>
                </form>
            </>
            ) : (
                <Success onClose={onClose}/>
            )
        }
        </>
    )
}
