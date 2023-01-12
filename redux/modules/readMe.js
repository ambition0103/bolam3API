// import uuid from "react-native-uuid";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// action value
// const ADD_README = "ADD_README";

// action creator
// export const addReadMe = (payload) => {
//   return {
//     type: ADD_README,
//     payload: payload,
//   };
// };

// initial state
// const initialState = {
//   test: [
//     {
//       id: uuid.v4(),
//       imgUri: "",
//       title: "",
//       writer: "",
//       rating: 0,
//       period: "",
//       isDone: "",
//       bestSentence: "",
//       myThinking: "",
//     },
//   ],
// };

// reducer
// const readMe = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_README:
//       return {
//         ...state,
//         test: [...state.test, action.payload],
//       };
//     default:
//       return state;
//   }
// };

// export default readMe;

/////////////// 리덕스와 리덕스 툴킷 구분 ///////////////

// initial state
// const initialState = {
//   test: [
//     {
//       id: uuid.v4(),
//       imgUri: "",
//       title: "",
//       writer: "",
//       rating: 0,
//       period: "",
//       isDone: "",
//       bestSentence: "",
//       myThinking: "",
//     },
//   ],
// };

// action creator, reducer : createSlice
// const readMeSlice = createSlice({
//   name: "readMe",
//   initialState: initialState,
//   reducers: {
//     addReadMe: (state, action) => {
//       return {
//         ...state,
//         test: [...state.test, action.payload],
//       };
//     },
//   },
// });

// export default readMeSlice.reducer;
// export const { addReadMe } = readMeSlice.actions;

/////////////// 리덕스 툴킷과 리덕스 툴킷 떵크 구분 ///////////////

// initial state
// const initialState = {
//   test: [],
//   isLoading: false,
//   error: null,
// };

// Thunk : createAsyncThuck, fulfillWithValue, rejectWithValue
// export const __getReadMe = createAsyncThunk(
//   "getReadMe",
//   async (payload, thunkAPI) => {
//     try {
//       const response_data = await axios.get("http://172.30.1.64:4000/test");
//       // console.log(response_data);
//       // console.log(response_data.data);
//       return thunkAPI.fulfillWithValue(response_data.data);
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

// export const __addReadMe = createAsyncThunk(
//   "addReadMe",
//   async (payload, thunkAPI) => {
//     try {
//       // console.log(payload);
//       await axios.post("http://172.30.1.64:4000/test", payload);
//       return thunkAPI.fulfillWithValue(payload);
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

// action creator, reducer : createSlice
// const readMeSlice = createSlice({
//   name: "readMe",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: {
//     [__getReadMe.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [__getReadMe.fulfilled]: (state) => {
//       state.isLoading = false;
//       state.test = action.payload;
//     },
//     [__getReadMe.rejected]: (state) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },

//     [__addReadMe.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [__addReadMe.fulfilled]: (state) => {
//       state.isLoading = false;
//       state.test = [...state.test, action.payload];
//     },
//     [__addReadMe.rejected]: (state) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export default readMeSlice.reducer;
// export const { getReadMe } = readMeSlice.actions;
