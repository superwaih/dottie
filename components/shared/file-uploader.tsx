"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone";
import Image from "next/image"
import { convertFileToUrl } from "@/utils";

type FileUploaderProps = {
    files: File[] | undefined;
    onChange: (files: File[]) => void
}

const FileUploader = ({files, onChange}: FileUploaderProps) =>{
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return(
        <div {...getRootProps()} className="file-upload !flex" >
            <input {...getInputProps()} />
         
            {files && files.length > 0 ?
                (
                    <Image
                        src={convertFileToUrl(files[0])}
                        alt="Verfication"
                        width={1000}
                        height={1000}
                        className="max-h-[400px] object-cover overflow-hidden"
                    />
                ) :
                (
                    <>
                        <Image
                            src={'/assets/icons/upload.svg'}
                            height={40}
                            width={40}
                            alt="upload"
                        />
                        <div className="file-upload-label">
                            <p className="text-14-regular">
                                <span className="text-green-500">Click to upload</span>
                                or drag and drop
                            </p>
                            <p className="text-12-regular">
                                SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default FileUploader