import {
  CONFIRM_REQUEST,
  SAVE_TO_DB
} from '../constants/ActionTypes'

export default function confirmation(state = {}, action) {
  switch (action.type) {
    case CONFIRM_REQUEST:
      return action.activities;
    case SAVE_TO_DB:
      console.log('save to db pressed');
      return state;
    default:
      return state;
  }
}

