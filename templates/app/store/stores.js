import { isStrictModeEnabled } from 'mobx';
import store from './store';
import UIStore from './stores/ui';
import AppStore from './stores/app';
import AuthStore from './stores/auth';
//import PostStore from './stores/post';

/**
 Enables MobX strict mode globally.
 In strict mode, it is not allowed to
 change any state outside of an action
 */
isStrictModeEnabled();

const $store = new store();
/**
  Stores
*/
export default $store
  .setup({
    ui: UIStore,
    app: AppStore,
    auth: AuthStore,
  //  post: PostStore,
  });
