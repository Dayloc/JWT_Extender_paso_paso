export const initialStore=()=>{
  return{
    message: null,
    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    
    default:
      throw Error('Unknown action.');
  }    
}
