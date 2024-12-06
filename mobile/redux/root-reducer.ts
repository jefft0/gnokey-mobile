import { combineSlices } from "@reduxjs/toolkit";
import { vaultSlice, signinSlice, signUpSlice, linkingSlice } from "@/redux/features";

const rootReducer = combineSlices({
    [vaultSlice.reducerPath]: vaultSlice.reducer,
    [signUpSlice.reducerPath]: signUpSlice.reducer,
    [signinSlice.reducerPath]: signinSlice.reducer,
    [linkingSlice.reducerPath]: linkingSlice.reducer,
});

export type RootState = {
    user: typeof vaultSlice.getInitialState;
    signin: typeof signinSlice.getInitialState;
    signUp: typeof signUpSlice.getInitialState;
    linking: typeof linkingSlice.getInitialState;
};

export type AppDispatch = typeof vaultSlice.actions & typeof signinSlice.actions & typeof signUpSlice.actions & typeof linkingSlice.actions;

export default rootReducer;