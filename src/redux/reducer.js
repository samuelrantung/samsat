import {SET_IMAGE, SET_VEHICLES, ADD_PHOTOS} from './action';

import {combineReducers} from 'redux';

const initialStateVehicleDetail = {
  // image: [{pertama: {}, kedua: {}, ketiga: {}}],
  image: [],
};

const VehicleDetailReducer = (state = initialStateVehicleDetail, action) => {
  if (action.type === SET_IMAGE) {
    console.log('VehicleDetailReducer: ', action);
    return {
      ...state,
      // image: action.payload,
      image: [...state.image, action.payload.assets],
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
  if (action.type === ADD_PHOTOS) {
    console.log('ADD photos :', action.payload);
    // return {
    //   action.payload.
    // }
  }
  return state;
};

const reducer = combineReducers({
  DashboardReducer,
  VehicleDetailReducer,
});

export default reducer;
