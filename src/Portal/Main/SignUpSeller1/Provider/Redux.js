//
// action constants
//

export const SET_EMAIL_PASSWORD = 'SET_EMAIL_PASSWORD';
export const SET_NEXT_STEP = 'SET_NEXT_STEP';
export const SET_PRICE = 'SET_PRICE';
export const SET_ERROR = 'SET_ERROR';

//
// action creators
//

export function setEmailPassword(email, password) {
  return dispatch => {
    dispatch({ type: SET_EMAIL_PASSWORD, email, password });
  };
}

export function nextStep() {
  return dispatch => {
    dispatch({ type: SET_NEXT_STEP });
  };
}

export function setPrice(price) {
  return dispatch => {
    dispatch({ type: SET_PRICE, price });
  };
}

export function setError(price) {
  return dispatch => {
    dispatch({ type: SET_ERROR, price });
  };
}

//
// actions
//

function setEmailPasswordAction(state, action) {
  return {
    ...state,
    email: action.email,
    password: action.password,
  };
}

function setNextStepAction(state) {
  const next = state.currentStep === 2 ? 0 : state.currentStep + 1;
  return {
    ...state,
    currentStep: next,
  };
}

function setPriceAction(state, action) {
  return {
    ...state,
    price: action.price,
  };
}

function setErrorAction(state, action) {
  return {
    ...state,
    error: action.error,
  };
}

//
// reducers
//

const INITIAL_STATE = {
  error: '',
  email: '',
  password: '',
  currentStep: 0,
  price: 0,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_EMAIL_PASSWORD: {
      return setEmailPasswordAction(state, action);
    }
    case SET_NEXT_STEP: {
      return setNextStepAction(state, action);
    }
    case SET_PRICE: {
      return setPriceAction(state, action);
    }
    case SET_ERROR: {
      return setErrorAction(state, action);
    }
    default: return state;
  }
}

export default reducer;
