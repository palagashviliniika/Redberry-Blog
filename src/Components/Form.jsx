import React, { useEffect, useState } from 'react'
import { Label } from '../Components/Label'
import { Dropdown } from './Dropdown'
import { Dropzone } from './Dropzone'
import { ErrorMessage } from './ErrorMessage'
import { authenticatedApi } from '../api/posts'

export const Form = () => {
    const [isEmailClicked, setIsEmailClicked] = useState(false)
    const [formData, setFormData] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {
            image: null,
            author: '',
            title: '',
            description: '',
            publish_date: '',
            categories: '[]',
            email: ''
        };
    });

    const [formErrors, setFormErrors] = useState({
        author: null,
        title: null,
        description: null,
        publish_date: null,
        categories: null,
        email: "",
        image: null,
      });

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData);
        
        const newFormData = new FormData();
        
        // Iterate through the properties of the existing formData
        for (const key in formData) {
            // Check if the property is not inherited from the prototype chain
            if (formData.hasOwnProperty(key)) {
                // Append the property to the new FormData
                newFormData.append(key, formData[key]);
            }
        }
        
        for (const entry of newFormData.entries()) {
            console.log(entry[0], entry[1]);
          }

        try {
            const response = await authenticatedApi.post('/blogs', newFormData)
            console.log(response.status);
            localStorage.removeItem('formData');
            localStorage.removeItem('fileName');
            localStorage.removeItem('imageBlob');
            localStorage.removeItem('selectedValues');
        } catch (err) {
            console.log(err.response.status);
            console.log(err.message);
        }

    }

    const handleChange = (e) => {
        const {name, value} = e.target
        validateField(name, value)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    // Validation Logic

    const validateField = (fieldName, value) => {
        switch (fieldName) {
          case "author":
            validateAuthor(value);
            break;
          case "title":
            validateTitle(value);
            break;
          case "description":
            validateDescription(value);
            break;
          case "publish_date":
            validatePublishDate(value);
            break;
          case "email":
            validateEmail(value);
            break;
        }
      };

      const validateAuthor = (value) => {
        const rules = [
            {
                condition: !value.trim(),
                message: "empty",
            },
            {
                condition: value.length < 4,
                message: "chars",
            },
            {
                condition: value.trim().split(/\s+/).length < 2,
                message: "words",
            },
            {
                condition: !/^[\u10A0-\u10EA\s]+$/.test(value),
                message: "geo",
            },
        ];
    
        const errors = rules.filter((rule) => rule.condition).map((rule) => rule.message);
    
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            author: errors,
        }));
    };

    const validateTitle = (value) => {
        let errors = ""
        if (value.length < 2) errors = "Title should have at least 2 characters"
    
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            title: errors,
        }));
    }

    const validateDescription = (value) => {
        let errors = ""
        if (value.length < 2) errors = "Description should have at least 2 characters"

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            description: errors,
        }));
    }
    
    const validatePublishDate = (value) => {
        console.log(value, "date");
        let errors = ""
        if (!value.trim()) errors = "გთხოვთ მიუთითოთ გამოქვეყნების თარიღი"
        
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            publish_date: errors
        }))
    }

    const validateCategories = (value) => {
        let errors = ""
        if (value === "[]") errors = "გთხოვთ აირჩიოთ კატეგორია"

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            categories: errors
        }))
    }

    const validateImage = (value) => {
        // console.log(value, "image");
        let errors = ""
        if (!value) errors = "გთხოვთ აირჩიოთ სურათი"

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            image: errors
        }))
    }

    const validateEmail = (value) => {
        setIsEmailClicked(true)
        const redberryRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.ge$/;
        let errors = "";
      
        // Rule: Email should match the redberryRegex pattern
        if (value.trim() && !redberryRegex.test(value)) {
          errors = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
        }
      
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          email: errors,
        }));
      };

    const isFormValid = () => {
        // Check if all form fields are valid
        return Object.values(formErrors).every((error) => error === "" || (Array.isArray(error) && error.length === 0));
    };
      

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);
      
    useEffect(() => {
        const storedImageBlob = localStorage.getItem('imageBlob');
        if (storedImageBlob) {
            // Parse the stored object containing data, type, and name
            const { data, type, name } = JSON.parse(storedImageBlob);
            
            // Reconstruct the blob from the array buffer
            const arrayBuffer = new Uint8Array(data).buffer;
            const blob = new Blob([arrayBuffer], { type });
            
            // Set the blob and file name in formData.image
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: blob,
            }));
        }
    }, []);
    
    useEffect(() => {
        console.log(formData, 'form data');
        // console.log(formErrors);
    }, [formData])

    return (
        <form onSubmit={handleSubmit} className='pt-10'>
                <Dropzone setFormData={setFormData} validate={validateImage} isValidated={formErrors.image} formData={formData}/>
                {
                    formErrors.image && 
                        <div className='mt-2'>
                            <ErrorMessage error={formErrors.image}/>
                        </div>
                }
                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'author'} title={'ავტორი *'} type={"text"} placeholder={'შეიყვნეთ ავტორი'} value={formData.author} onChange={handleChange} isValidated={formErrors.author}/>
                        <ul className='text-xs'>
                            <li className={formErrors.author === null ? 'text-customGray-plc' : formErrors.author.includes('chars') ? 'text-customRed' : 'text-border-correct'}>
                                • მინიმუმ 4 სიმბოლო
                            </li>
                            <li className={formErrors.author === null ? 'text-customGray-plc' : formErrors.author.includes('words') ? 'text-customRed' : 'text-border-correct'}>
                                • მინიმუმ ორი სიტყვა
                            </li>
                            <li className={formErrors.author === null ? 'text-customGray-plc' : formErrors.author.includes('geo') ? 'text-customRed' : 'text-border-correct'}>
                                • მხოლოდ ქართული სიმბოლოები
                            </li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'title'} title={'სათაური *'} type={"text"} placeholder={'შეიყვნეთ სათაური'} value={formData.title} onChange={handleChange} isValidated={formErrors.title}/>
                        <ul className={`text-xs ${formErrors.title === null ? 'text-customGray-plc' : formErrors.title === "" || formErrors.title.length === 0 ? 'text-border-correct' : 'text-customRed'}`}>
                            <li>მინიმუმ 2 სიმბოლო</li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                <label htmlFor={'description'} className='font-medium text-sm text-customBlack pt-6'>აღწერა *</label>
                <textarea
                    placeholder='შეიყვნანეთ აღწერა'
                    name='description'
                    id='description'
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={`text-sm font-normal border ${formErrors.description === null ? 'border-border bg-inputBG' : formErrors.description === "" || formErrors.description === 0 ? 'border-border-correct bg-inputBG-correct' : 'border-border-error bg-inputBG-error'} rounded-xl py-3 px-4 focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus`}
                    />
                <ul className={`text-xs ${formErrors.description === null ? 'text-customGray-plc' : formErrors.description === "" || formErrors.description.length === 0 ? 'text-border-correct' : 'text-customRed'}`}>
                    <li>მინიმუმ 2 სიმბოლო</li>
                </ul>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'publish_date'} title={"გამოქვეყნების თარიღი *"} type={"date"} value={formData.publish_date} onChange={handleChange} isValidated={formErrors.publish_date} showErrors/>
                    </div>
                    <Dropdown setFormData={setFormData} validate={validateCategories} isValidated={formErrors.categories} formData={formData}/>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'email'} title={"ელ-ფოსტა"} type="email" placeholder='Example@redberry.ge' value={formData.email} onChange={handleChange} isValidated={formErrors.email} showErrors additional={isEmailClicked}/>
                    </div>
                </div>

                <div className='flex justify-end mt-10 mb-20'>
                    <button 
                        type='submit' 
                        className='w-72 font-medium text-white bg-customPurple disabled:bg-border rounded-lg py-2.5 text-sm'
                        disabled={!isFormValid()}
                    >
                        გამოქვეყნება
                    </button>
                </div>

            </form>
    )
}
