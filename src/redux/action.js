export const SET_VEHICLES = 'SET_VEHICLES';

export function getVehicles(request) {
  console.log('getVehicles: ', request);
  return {
    type: SET_VEHICLES,
    payload: request,
  };
}

export const ADD_PHOTOS = 'ADD_PHOTOS';

export function addPhotos(request) {
  console.log('addPhotos: ', request);
  return {
    type: ADD_PHOTOS,
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
