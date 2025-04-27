import { configureStore} from '@reduxjs/toolkit';
import AuthSlice from '../Slices/AuthSlice.jsx'
import ProgrammingSlice from '../Slices/ProgrammingSlice.jsx'
import AICodeSLice from '../Slices/AICodeSlice.jsx';

const store = configureStore({
    reducer:{
        auth : AuthSlice,
        programming :ProgrammingSlice,
        aiCode : AICodeSLice
    }
})

export default store;