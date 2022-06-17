import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMember = createAsyncThunk(
	'member/requestMember',
	async () => {
		const url = `${process.env.PUBLIC_URL}/DB/members.json`;
		const response = await axios.get(url);
		return response.members;
	}
);

const memberSlice = createSlice({
	name: 'member',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchMember.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchMember.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchMember.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default memberSlice.reducer;
