import * as React from 'react';

const createStore = <T extends object, A extends object>(initialState: T, reducer: React.Reducer<T, A>) => {
  const stateContext = React.createContext<T | undefined>(undefined);
  const dispatchContext = React.createContext<React.Dispatch<A> | undefined>(undefined);

  const provider = (props: { children: any }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <dispatchContext.Provider value={dispatch}>
        <stateContext.Provider value={state}>
            {props.children}
        </stateContext.Provider>
      </dispatchContext.Provider>
    );
  };

  return {
    stateContext: stateContext,
    dispatchContext: dispatchContext,
    provider: provider,
    getState: () => React.useContext(stateContext),
    getDispatch: () => React.useContext(dispatchContext)
  };
};

export default createStore;