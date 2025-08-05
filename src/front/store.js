export const initialStore = () => {
  return {
    message: null,
    token: ""
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "save_token":
      return {
        ...store,
        token: action.payload
      };
    case "set_hello" :
      return{
        ...store,
        massage: action.payload
      } 
    default:
      return store;
  }
}
