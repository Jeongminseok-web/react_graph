import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // 툴킷 임포트
import {
  GET_REVENUE_API_URL,
  GET_SALES_MAP_API_URL,
  GET_VISITORS_API_URL,
  GET_VOLUME_SERVICES_API_URL,
} from '../../../constants/apiUrl'; // API URL 임포트
import { getRequest } from '../../../constants/requestMethods'; // API 메서드 임포트

// 공동된 비동기 액션 생성 로직을 별도의 함수로 분리

const createFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async () => {
    return await getRequest(apiURL);
  });
};

export const fetchRevenueData = createFetchThunk(
  'fetchRevenue',
  GET_REVENUE_API_URL
);

export const fetchVisitorsData = createFetchThunk(
  'fetchVisitors',
  GET_VISITORS_API_URL
);

export const fetchMapsData = createFetchThunk(
  'fetchMaps',
  GET_SALES_MAP_API_URL
);

export const fetchServicesData = createFetchThunk(
  'fetchServices',
  GET_VOLUME_SERVICES_API_URL
);

const handleFullfilled = (stateKey) => (state, action) => {
  // Add user to the state array
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    revenueData: null,
    visitorsData: null,
    mapsData: null,
    servicesData: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchRevenueData.fulfilled, handleFullfilled('revenueData'))
      .addCase(fetchRevenueData.rejected, handleRejected)

      .addCase(fetchVisitorsData.fulfilled, handleFullfilled('visitorsData'))
      .addCase(fetchVisitorsData.rejected, handleRejected)

      .addCase(fetchMapsData.fulfilled, handleFullfilled('mapsData'))
      .addCase(fetchMapsData.rejected, handleRejected)

      .addCase(fetchServicesData.fulfilled, handleFullfilled('servicesData'))
      .addCase(fetchServicesData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
