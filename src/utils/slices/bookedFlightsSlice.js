import { createSlice } from "@reduxjs/toolkit";

const bookedFlightsSlice = createSlice({
    name: 'bookedFlights',
    initialState: { getBookedFlights: [] },
    reducers: {
      getBookedFlights(state, action) {
        state.getBookedFlights.push(action.payload); // Diziye yeni flight ekle
      },
      refreshBookedFlights(state,action){
        state.getBookedFlights = []
      }
    },
  });

export const bookedFlightsActions = bookedFlightsSlice.actions;
export default bookedFlightsSlice;