import { configureStore} from '@reduxjs/toolkit';
import AuthSlice from '../Slices/AuthSlice.jsx'
const store = configureStore({
    reducer:{
        auth : AuthSlice,
    }
})

export default store;