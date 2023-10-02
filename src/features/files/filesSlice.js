import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiles } from '../../api/filesAPI';

export const getFiles = createAsyncThunk('files/getFiles', async (fileName = null) => {
  const response = await fetchFiles(fileName);
  return response;
});

const filesSlice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getFiles.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
});

export default filesSlice.reducer;
