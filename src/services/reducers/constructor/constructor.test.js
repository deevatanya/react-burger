import constructorReducer from './constructor';
import * as types from '../../constants';

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {}))
        .toEqual({
        unLocked: [],
        bun: null
      })
  });

  it('should handle DELETE_INGREDIENT', () => {
    expect(constructorReducer({
        unLocked: [{uuid: '123'}, {uuid: '321'}],
        bun: null
    }, {
        type: types.DELETE_INGREDIENT,
        uuid: '123'
    })).toEqual({
        unLocked: [{uuid: '321'}],
        bun: null
    });
  });

  it('should handle ADD_UNLOCKED_INGREDIENT', () => {
    expect(constructorReducer({
        unLocked: [{uuid: '123', name: 'bla'}],
        bun: null
    }, {
        type: types.ADD_UNLOCKED_INGREDIENT,
        info: {uuid: '999', name: 'new'}
    })).toEqual({
        unLocked: [{uuid: '123', name: 'bla'}, {uuid: '999', name: 'new'}],
        bun: null
    });
  });

  it('should handle ADD_BUN_INGREDIENT', () => {
    expect(constructorReducer({
        unLocked: [{uuid: '123', name: 'bla'}],
        bun: null
    }, {
        type: types.ADD_BUN_INGREDIENT,
        info: {uuid: '777', name: 'bun'}
    })).toEqual({
        unLocked: [{uuid: '123', name: 'bla'}],
        bun: {uuid: '777', name: 'bun'}
    });
  });

  it('should handle DELETE_ALL_INGREDIENTS', () => {
    expect(constructorReducer({
        unLocked: [{uuid: '123', name: 'bla'}],
        bun: {uuid: '777', name: 'bun'}
    }, {
        type: types.DELETE_ALL_INGREDIENTS,
    })).toEqual({
        unLocked: [],
        bun: null
    });
  });

  it('should handle UPDATE_UNLOCKED', () => {
    expect(constructorReducer({
        unLocked: [{uuid: '111', name: 'first'}, {uuid: '999', name: 'second'}],
        bun: {uuid: '000', name: 'bun'}
    }, {
        type: types.UPDATE_UNLOCKED,
        updatedUnLocked: [{uuid: '999', name: 'second'}, {uuid: '111', name: 'first'}]
    })).toEqual({
        unLocked: [{uuid: '999', name: 'second'}, {uuid: '111', name: 'first'}],
        bun: {uuid: '000', name: 'bun'}
    });
  });

});