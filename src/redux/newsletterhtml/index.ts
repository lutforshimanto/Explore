import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsletterHtmlState {
  html: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsletterHtmlState = {
  html: 'Welcome to the newsletter editor!',
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetHtml: (state) => {
      state.html = '';
      state.error = null;
    },
  },
});

export const { setHtml, setLoading, setError, resetHtml } = newsletterHtmlSlice.actions;
export default newsletterHtmlSlice.reducer;