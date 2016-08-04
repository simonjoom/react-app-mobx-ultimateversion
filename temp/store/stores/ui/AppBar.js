import { observable } from 'mobx';
import { toggle } from '~/temp/core/decorators';

@toggle('toggleAccountMenu', 'accountMenuIsOpen')
export default class AppBar {

  @observable accountMenuIsOpen = false;
}
