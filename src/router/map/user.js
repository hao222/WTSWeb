const router = [{
  path: '/user',
  component: function (resolve) {
    require(['VIEWS/user'], resolve);
  },
  meta: {
    auth: true,
    title: "用户中心"
  }
}];

export default router;
