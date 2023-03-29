import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('SUCESSO');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('Erro!');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('Estou fazendo a REQUISIÇÃO');
      return state;
    }

    default: {
      return state;
    }
  }
}
