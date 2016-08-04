import { observable,computed, action } from 'mobx';

export default class AppState {

  @observable items = [];

  constructor(initialState) {
    this.items = initialState && initialState.items ? initialState.items : [];
  }

  @action
  addItem(item) {
    this.items.push(item);
  }

  @computed
  get tJson() {
    return {
      items: this.items
    };
  }
}

