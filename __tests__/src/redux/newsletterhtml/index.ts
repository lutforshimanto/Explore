import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsletterHtmlState {
  html: string;
  coverPhoto: string | null;
  title: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsletterHtmlState = {
  html: 'Welcome to the newsletter editor!',
  coverPhoto: null,
  title: null,
  isLoading: false,
  error: null,
};

const newsletterHtmlSlice = createSlice({
  name: 'newsletterHtml',
  initialState,
  reducers: {
    setHtml: (state, action: PayloadAction<string>) => {
      state.html = action.payload;
    },
    setCoverPhoto: (state, action: PayloadAction<string | null>) => {
      state.coverPhoto = action.payload;
    },
    setTitle: (state, action: PayloadAction<string | null>) => {
      state.title = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetHtml: (state) => {
      state.html = '';
      state.coverPhoto = null;
      state.title = null;
      state.error = null;
    },
  },
});

export const { setHtml, setCoverPhoto,
  setTitle, setLoading, setError, resetHtml } = newsletterHtmlSlice.actions;
export default newsletterHtmlSlice.reducer;