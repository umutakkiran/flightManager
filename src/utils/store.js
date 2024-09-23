import { configureStore } from "@reduxjs/toolkit"
import stepSlice from "./slices/stepSlice";
import bookedFlightsSlice from "./slices/bookedFlightsSlice";
import departureSlices from "./slices/departureSlice";
import arrivalSlices from "./slices/arrivalSlice";
import scheduleTimeSlice from "./slices/scheduleTime";

const store = configureStore({
    reducer:{
        step: stepSlice.reducer,
        bookedFlights: bookedFlightsSlice.reducer,
        departure: departureSlices.reducer,
        arrival: arrivalSlices.reducer,
        scheduleTime: scheduleTimeSlice.reducer
    }
})

export default store;