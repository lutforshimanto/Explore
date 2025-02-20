import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  export const Uploader = generateUploadButton<OurFileRouter>();
  export const Dropzone = generateUploadDropzone<OurFileRouter>();

  