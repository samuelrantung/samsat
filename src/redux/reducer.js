import {combineReducers} from 'redux';

const initialStateVehicleDetail = {
  fotoKendaraan: 'hehehe',
};

const VehicleDetailReducer = (state = initialStateVehicleDetail, action) => {
  return state;
};

const initialStateDashboard = {
  vehicles: [],
  // title: "samuel rantung",
};

const DashboardReducer = (state = initialStateDashboard, action) => {
  if (action.type === 'SET_VEHICLE') {
    return {
      ...state,
      vehicles: [...state.vehicles, action.res],
    };
  }
  return state;
};

const reducer = combineReducers({
  DashboardReducer,
});

export default reducer;
