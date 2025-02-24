import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';

import { OurFileRouter } from '@/app/api/uploadthing/core';

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploadButton<OurFileRouter>();
export const Dropzone = generateUploadDropzone<OurFileRouter>();
