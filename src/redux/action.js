export const UPDATE_VEHICLES = 'UPDATE_VEHICLES';

export function updateVehicle(request) {
  console.log('updateVehicles: ', request);
  return {
    type: UPDATE_VEHICLES,
    payload: request,
  };
}

export const SET_VEHICLES = 'SET_VEHICLES';

export function getVehicles(request) {
  console.log('getVehicles: ', request);
  return {
    type: SET_VEHICLES,
    payload: request,
  };
}

export const SET_IMAGE = 'SET_IMAGE';

export function getImage(request) {
  console.log('getImage: ', request);
  return {
    type: SET_IMAGE,
    payload: request,
  };
}
