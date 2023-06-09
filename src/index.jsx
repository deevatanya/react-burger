import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { rootReducer } from './services/reducers'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { initialState } from './services/initialState';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, initialState, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
