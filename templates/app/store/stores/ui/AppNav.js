import { observable } from 'mobx';
import { toggle } from '~/temp/core/decorators';

@toggle('open', 'isOpen')
@toggle('dock', 'isDocked')
export default class AppNav {

  @observable isOpen = false;
  @observable isDocked = false;
}
