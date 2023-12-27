import React, {useEffect, useState} from 'react'
import gallery from '../assets/gallery.png'
import { CloseIcon } from '../icons/CloseIcon'
import { DropdownIcon } from '../icons/DropdownIcon'

export const Dropzone = ({setFormData,validate}) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFile, setSelectedFile] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = e.dataTransfer.files[0];
        setSelectedFile(file)
    };

    const handleDeleteFile = () => {
        // Reset formData.image to empty
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: "",
        }));
        setSelectedFile('');
      };

    useEffect(() => {
        setIsClicked(true)
        if (isClicked) validate(selectedFile)

        setFormData(prevFormData => ({
            ...prevFormData,
            image: selectedFile
        }))
    }, [selectedFile])
    
    // const encodeFileToBinaryString = (file) => {
    //     const fileReader = new FileReader();
      
    //     fileReader.onload = (event) => {
    //       // Convert Base64 data to binary string
    //       const base64String = event.target.result.split(',')[1];
    //       const binaryString = atob(base64String);
      
    //       // Set binary string to formData.image
    //       setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         image: binaryString,
    //       }));
      
    //       setSelectedFile(file);
    //     };
      
    //     // Read file as Data URL (Base64)
    //     fileReader.readAsDataURL(file);
    //   };
      

    // const encodeFileToBlob = (file) => {
    //     const fileReader = new FileReader();
      
    //     fileReader.onload = (event) => {
    //       // Convert Base64 data to binary string
    //       const base64String = event.target.result.split(',')[1];
    //       const binaryString = atob(base64String);
      
    //       // Create Uint8Array from binary string
    //       const uint8Array = new Uint8Array(binaryString.length);
    //       for (let i = 0; i < binaryString.length; i++) {
    //         uint8Array[i] = binaryString.charCodeAt(i);
    //       }
      
    //       // Create Blob from Uint8Array
    //       const blob = new Blob([uint8Array], { type: file.type });
      
    //       // Set Blob to formData.image
    //       setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         image: blob,
    //       }));
      
    //       setSelectedFile(file);
    //     };
      
    //     // Read file as Data URL (Base64)
    //     fileReader.readAsDataURL(file);
    //   };
      
    return (
        <>
            <label 
                htmlFor={"image"}
                className='font-medium text-sm text-customBlack pt-6'
            >
                ატვირთეთ ფოტო
            </label>
            {
                selectedFile ? (
                    <div className='bg-customGray-uploaded p-4 rounded-xl flex items-center justify-between mt-2'>
                        <div className='flex items-center gap-3'>
                            <img src={gallery} alt="" />
                            <p className='text-sm'>
                            {selectedFile.name}
                            </p>
                        </div>
                        <div className='cursor-pointer' onClick={handleDeleteFile}>
                            <CloseIcon />
                        </div>
                    </div>
                ) : (
                    <div 
                        className={`flex items-center justify-center w-full bg-imgInput hover:bg-imgInput-hover ${isDragOver && 'bg-imgInput-hover' } mt-2`}
                        onDragOver={handleDragOver}  
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <label 
                            htmlFor="image" 
                            className='flex flex-col items-center justify-center w-full h-[180px] border border-textGray border-dashed rounded-lg cursor-pointer'
                        >
                            <div className='flex flex-col items-center justify-center gap-6 py-12'>
                            <DropdownIcon />
                                <p className='text-sm font-normal'>
                                    {isDragOver
                                        ? 'ჩააგდეთ ფაილი'
                                        : <span>
                                            ჩააგდეთ ფაილი აქ ან{' '}
                                            <span className='font-medium underline decoration-solid'>აირჩიეთ ფაილი</span>
                                        </span>
                                    }
                                </p>
                            </div>
                            <input id='image' type="file" className='hidden' onChange={handleFileChange}/>
                        </label>
                    </div>
                )
            }
        </>
    )
}
