import { observable } from 'mobx';
import { toggle } from '~/temp/core/decorators';

@toggle('open', 'isOpen')
export default class PostCreateModal {

  @observable isOpen = false;
}
