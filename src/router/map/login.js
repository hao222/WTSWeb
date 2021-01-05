const router = [{
  path: '/login',
  component: function (resolve) {
    require(['VIEWS/login'], resolve);
  },
  meta: {
    auth: false,
  }
}];

export default router;
