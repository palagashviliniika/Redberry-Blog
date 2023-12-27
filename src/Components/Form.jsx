import React, { useEffect, useState } from 'react'
import { Label } from '../Components/Label'
import { Dropdown } from './Dropdown'
import { Dropzone } from './Dropzone'

export const Form = () => {
    const [formData, setFormData] = useState({
        image: "",
        author: "",
        title: "",
        description: "",
        publish_date: "",
        categories: "[]",
        email: ""
    })
    const [formErrors, setFormErrors] = useState({
        author: null,
        title: null,
        description: null,
        publish_date: null,
        categories: null,
        email: null,
        image: null,
      });

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
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
                message: "Author should not be empty",
            },
            {
                condition: value.length < 2,
                message: "Author should have at least 2 characters",
            },
            {
                condition: value.trim().split(/\s+/).length < 2,
                message: "Author should have at least 2 words",
            },
            {
                condition: !/^[\u10A0-\u10EA\s]+$/.test(value),
                message: "Author should only have Georgian letters",
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
        if (value.length < 4) errors = "Title should have at least 4 characters"
    
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
        if (!value.trim()) errors = "Publish date should not be empty"
        
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            publish_date: errors
        }))
    }

    const validateCategories = (value) => {
        let errors = ""
        if (value === "[]") errors = "Categories should not be empty"

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            categories: errors
        }))
    }

    const validateImage = (value) => {
        // console.log(value, "image");
        let errors = ""
        if (!value) errors = "Image should not be empty"

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            image: errors
        }))
    }

    const validateEmail = (value) => {
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
      

    // useEffect(() => {
    //     // console.log(formData, 'form data');
    //     console.log(formErrors);
    // }, [formData])

    return (
        <form onSubmit={handleSubmit} className='pt-10'>
                <Dropzone setFormData={setFormData} validate={validateImage} isValidated={formErrors.image}/>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'author'} title={'ავტორი *'} type={"text"} placeholder={'შეიყვნეთ ავტორი'} value={formData.author} onChange={handleChange} isValidated={formErrors.author}/>
                        <ul className='text-xs text-customGray-plc'>
                            <li>• მინიმუმ 4 სიმბოლო</li>
                            <li>• მინიმუმ ორი სიტყვა</li>
                            <li>• მხოლოდ ქართული სიმბოლოები</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'title'} title={'სათაური *'} type={"text"} placeholder={'შეიყვნეთ სათაური'} value={formData.title} onChange={handleChange} isValidated={formErrors.title}/>
                        <ul className='text-xs text-customGray-plc'>
                            <li>მინიმუმ 4 სიმბოლო</li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                <label htmlFor={'description'} className='font-medium text-sm text-customBlack pt-6'>აღწერა *</label>
                <textarea
                    placeholder='Describe Project'
                    name='description'
                    id='description'
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={`text-sm font-normal border ${formErrors.description === null ? 'border-border bg-inputBG' : formErrors.description === "" || formErrors.description === 0 ? 'border-border-correct bg-inputBG-correct' : 'border-border-error bg-inputBG-error'} rounded-xl py-3 px-4 focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus`}
                    />
                <ul className='text-xs text-customGray-plc'>
                    <li>მინიმუმ 2 სიმბოლო</li>
                </ul>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'publish_date'} title={"გამოქვეყნების თარიღი *"} type={"date"} value={formData.publish_date} onChange={handleChange} isValidated={formErrors.publish_date}/>
                    </div>
                    <Dropdown setFormData={setFormData} validate={validateCategories} isValidated={formErrors.categories}/>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'email'} title={"ელ-ფოსტა"} type="email" placeholder='Example@redberry.ge' value={formData.email} onChange={handleChange} isValidated={formErrors.email}/>
                    </div>
                </div>

                <div className='flex justify-end mt-10 mb-20'>
                    <button type='submit' className='w-72 font-medium text-white bg-customPurple rounded-lg py-2.5 text-sm'>
                        გამოქვეყნება
                    </button>
                </div>

            </form>
    )
}
