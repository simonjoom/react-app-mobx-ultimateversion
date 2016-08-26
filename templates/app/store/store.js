import _ from 'lodash';
import { action} from 'mobx';


class Store {

  $stores = {};

  $imports = {};

  setup(imports) {
    this.$imports = imports;
    return this;
  }

  @action inject(mstate = {}) {
    this.initializeStores(mstate);
    return this.$stores;
  }

  // alias of inject
  init(mstate = {}) {
    return this.inject(mstate);
  }

  // alias of inject
  set(mstate = {}) {
    return this.inject(mstate);
  }

  get() {
    return this.$stores;
  }

 @action initializeStores(mstate) {
    Object.keys(this.$imports)
      .forEach((key) => {
        const StoreClass = this.$imports[key];
        const $state = mstate[key] || {};
        const $obj = new StoreClass($state);
        const $extend = $obj.___extend || null;
        Object.assign($obj, $state);
        this.extendWithNestedClass($obj, $state, $extend);
        this.$stores[key] = $obj;
        if (_.isFunction($obj.init)) {
          $obj.init($state);
        }
      });
  }

 extendWithNestedClass(obj, mstate, extend = null) {
    if (_.isUndefined(extend) || _.isEmpty(extend)) return;

    Object.keys(extend)
      .forEach((subkey) => {
        const SubClass = extend[subkey];
        const $substate = mstate[subkey] || {};
        const $subobj = new SubClass($substate);
        const $subextend = $subobj.___extend || null;

        Object.assign($subobj, $substate);

        Object.assign(obj, { [subkey]: $subobj });

        // recursion for deep nested classes
        this.extendWithNestedClass($subobj, $substate, $subextend);
        if (_.isFunction($subobj.init)) {
          $subobj.init($substate);
        }
      });
  }
}

export default Store;
