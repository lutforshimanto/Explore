import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadedFilesState {
  imageUrl: string;
}

const initialState: UploadedFilesState = {
  imageUrl: '',
};

const uploadedFilesSlice = createSlice({
  name: 'uploadedFiles',
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    removeImage: state => {
      state.imageUrl = '';
    },
  },
});

export const { setImageUrl, removeImage } = uploadedFilesSlice.actions;
export default uploadedFilesSlice.reducer;
