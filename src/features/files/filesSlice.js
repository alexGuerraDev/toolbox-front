import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiles, fetchFileList } from '../../api/filesAPI';

export const getFiles = createAsyncThunk('files/getFiles', async (fileName = null) => {
  const response = await fetchFiles(fileName);
  return response;
});
export const getFileList = createAsyncThunk('files/list', async () => {
  const response = await fetchFileList();
  return response;
});

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    fileList: [],
  },
  reducers: {},
  extraReducers: {
    [getFiles.fulfilled]: (state, action) => {
      state.files = action.payload;
    },
    [getFileList.fulfilled]: (state, action) => {
      state.fileList = action.payload;
    }
  }
});

export default filesSlice.reducer;
