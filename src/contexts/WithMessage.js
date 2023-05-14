import { createContext, useContext, useReducer } from 'react';
import GlobalMessage from '../components/GlobalMessage/GlobalMessage';
import { genId } from '../helpers';

const initialState = {
  messages: []
};

const ACTION = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.ADD_MESSAGE:
      return { messages: [...state.messages, action.payload] };
    case ACTION.REMOVE_MESSAGE:
      return { messages: state.messages.filter((message) => message.id !== action.payload) };
    default:
      return state;
  }
}

const MessageContext = createContext();

const WithMessage = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pushMessage = (status, content) => {
    const id = genId();
    dispatch({ type: ACTION.ADD_MESSAGE, payload: { id, status, content } });
    setTimeout(() => {
      dispatch({ type: ACTION.REMOVE_MESSAGE, payload: id });
    }, 3000);
  };

  return (
    <MessageContext.Provider value={{ pushMessage }}>
      <GlobalMessage messages={state.messages} />
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = () => useContext(MessageContext);

export { WithMessage, useMessageContext };
