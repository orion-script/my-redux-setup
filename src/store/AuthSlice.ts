import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIService from "../utils/APIServices";
import { baseUrl } from "../utils/endpoints";
import { getSimplifiedError } from "../utils";

export interface Hospital {
  hospital_name: string;
  address: string;
  city: string;
  state: string;
  role: string;
  admin_email: string;
  license_number: string;
  logo: string;
  password: string;
}

export interface AuthState {
  loading: boolean;
  token: string;
  error?: boolean;
  success: boolean;
  hospitalData: Hospital;
}

const initialState: AuthState = {
  loading: false,
  token: "",
  error: false,
  success: false,
  hospitalData: {
    hospital_name: "",
    address: "",
    city: "",
    state: "",
    role: "hospital",
    admin_email: "",
    license_number: "",
    logo: "",
    password: "",
  },
};

// Define a type for the login credentials
type HospitalLoginCredentials = {
  admin_email: string;
  password: string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreDefault: (state) => {
      state.loading = false;
      state.token = "";
      state.hospitalData = { ...initialState.hospitalData };
    },
    resetAll: (state) => {
      state.loading = false;
      state.success = false;
    },
    // setAddress: (state, action: PayloadAction<any>) => {
    //   state.address = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // Update the builder according to API actions
    // Add asynchronous actions and their logic here
  },
});

console.log("baseUrl", baseUrl);

interface ApiResponse<T> {
  status: number;
  data: T;
}

// The createAsyncThunk for hospital signup
export const createHospital = createAsyncThunk<
  ApiResponse<any>,
  Hospital,
  { rejectValue: string }
>("createHospital", async (hospitalData: Hospital, { rejectWithValue }) => {
  try {
    const response = await APIService.post<ApiResponse<any>>(
      `${baseUrl}hospitals/create`,
      hospitalData
    );

    if (response.status === 422) {
      return rejectWithValue("Unprocessable Content");
    }

    return response.data;
  } catch (error) {
    let newError = getSimplifiedError(error);
    return rejectWithValue(newError);
  }
});

// The createAsyncThunk for hospital login
export const hospitalLogin = createAsyncThunk<
  ApiResponse<any>,
  HospitalLoginCredentials,
  { rejectValue: string }
>("hospitalLogin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await APIService.post<ApiResponse<any>>(
      `${baseUrl}auth/hospital/login`,
      credentials
    );

    if (response.status === 401) {
      return rejectWithValue("Unauthorized");
    }

    return response.data;
  } catch (error) {
    let newError = getSimplifiedError(error);
    return rejectWithValue(newError);
  }
});

export const authSelector = (state: { auth: AuthState }) => state.auth;

export const { restoreDefault, resetAll } = authSlice.actions;
export default authSlice.reducer;
