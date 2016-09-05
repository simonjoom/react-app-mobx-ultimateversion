export default {
  model: 'usermongo',
  namespace: '/user',
  options: {
    // id: 'uuid',
    paginate: {
      default: 25,
      max: 50,
    },
  },
};
