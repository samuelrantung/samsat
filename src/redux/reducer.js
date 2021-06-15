import {SET_IMAGE, SET_VEHICLES, UPDATE_VEHICLES} from './action';

import {combineReducers} from 'redux';

const initialStateUpdateVehicle = {
  vehicle: [],
};

const UpdateVehicleReducer = (state = initialStateUpdateVehicle, action) => {
  if (action.type === UPDATE_VEHICLES) {
    console.log('UpdateVehicleReducer: ', action);
    return {
      ...state,
      vehicle: action.payload,
    };
  }
  return state;
};

const initialStateVehicleDetail = {
  // image: [{pertama: {}, kedua: {}, ketiga: {}}],
  image: [],
};

const VehicleDetailReducer = (state = initialStateVehicleDetail, action) => {
  if (action.type === SET_IMAGE) {
    console.log('VehicleDetailReducer: ', action);
    return {
      ...state,
      image: action.payload,
      // image: [...state.image, action.payload.assets],
    };
  }
  return state;
};

const initialStateDashboard = {
  vehicles: [],
};

const DashboardReducer = (state = initialStateDashboard, action) => {
  if (action.type === SET_VEHICLES) {
    console.log('DashboardReducer: wkwkwkwk ', action.payload.data);
    if (action.payload.data === undefined) {
      action.payload.data = [];
    }
    return {
      ...state,
      // vehicles: [...state.vehicles, action.payload.data],
      vehicles: action.payload.data,
      // vehicles: payload,
    };
  }
  return state;
};

const reducer = combineReducers({
  DashboardReducer,
  VehicleDetailReducer,
  UpdateVehicleReducer,
});

export default reducer;
