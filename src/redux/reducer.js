import {SET_IMAGE, SET_VEHICLES} from './action';

import {combineReducers} from 'redux';

const initialStateVehicleDetail = {
  image: {},
};

const VehicleDetailReducer = (state = initialStateVehicleDetail, action) => {
  if (action.type === SET_IMAGE) {
    console.log('VehicleDetailReducer: ', action);
    // return{
    //   ...state,

    // }
  }
  return state;
};

const initialStateDashboard = {
  vehicles: [],
};

const DashboardReducer = (state = initialStateDashboard, action) => {
  if (action.type === SET_VEHICLES) {
    console.log('DashboardReducer: wkwkwkwk ', action.payload.data);

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
});

export default reducer;
