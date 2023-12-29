import React, {useEffect, useState} from 'react'
import gallery from '../assets/gallery.png'
import { CloseIcon } from '../icons/CloseIcon'
import { DropdownIcon } from '../icons/DropdownIcon'

export const Dropzone = ({setFormData,validate, isValidated, formData}) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFile, setSelectedFile] = useState(formData.image)
    const [isClicked, setIsClicked] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        convertAndSaveBlob(file)
      };
    
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
    
        setSelectedFile(file);
        convertAndSaveBlob(file)
    };
    
      const handleDeleteFile = () => {
        // Reset formData.image to null
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: null,
        }));
        setSelectedFile(null);
        localStorage.removeItem('imageBlob');
        localStorage.removeItem('fileName');
      };
    
      const convertAndSaveBlob = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
      
          // Extract the MIME type from the original file
          const mimeType = file.type;
      
          // Create the Blob object with the extracted MIME type
          const blob = new Blob([arrayBuffer], { type: mimeType });
      
          const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
          if (blob.size <= maxSizeInBytes) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              image: blob,
            }));
        
            // Save the blob data, type, and name separately in localStorage
            localStorage.setItem('imageBlob', JSON.stringify({
              data: Array.from(new Uint8Array(arrayBuffer)),
              type: mimeType,
            }));
            localStorage.setItem('fileName', file.name)
          }
        };
          reader.readAsArrayBuffer(file);
        };
      
      
    
      useEffect(() => {
        setIsClicked(true);
        if (isClicked) validate(selectedFile);
        // console.log(selectedFile, "selected");
    
        // setFormData((prevFormData) => ({
        //   ...prevFormData,
        //   image: selectedFile,
        // }));
      }, [selectedFile]);
      
    return (
        <>
            <label 
                htmlFor={"image"}
                className='font-medium text-sm text-customBlack pt-6'
            >
                ატვირთეთ ფოტო
            </label>
            {
                formData.image ? (
                    <div className='bg-customGray-uploaded p-4 rounded-xl flex items-center justify-between mt-2'>
                        <div className='flex items-center gap-3'>
                            <img src={gallery} alt="" />
                            <p className='text-sm'>
                            {localStorage.getItem('fileName')}
                            </p>
                        </div>
                        <div className='cursor-pointer' onClick={handleDeleteFile}>
                            <CloseIcon />
                        </div>
                    </div>
                ) : (
                    <div 
                        className={`flex items-center justify-center w-full ${isValidated === null ? 'bg-imgInput' : "bg-inputBG-error"}  hover:bg-imgInput-hover ${isDragOver && 'bg-imgInput-hover' } mt-2`}
                        onDragOver={handleDragOver}  
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <label 
                            htmlFor="image" 
                            className={`flex flex-col items-center justify-center w-full h-[180px] border ${isValidated === null ? 'border-textGray' : "border-border-error"}  border-dashed rounded-lg cursor-pointer`}
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
