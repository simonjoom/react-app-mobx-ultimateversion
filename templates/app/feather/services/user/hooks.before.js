import { hooks as auth } from 'feathers-authentication';
import { setUUID } from '../../hooks/setUUID';
/**
 Hook: before
 Service: user
 */
export default {
  all: [],
  find: [],
  get: [],
  create: [
    setUUID(),
    auth.hashPassword(),
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner(),
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner(),
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner(),
  ],
};
