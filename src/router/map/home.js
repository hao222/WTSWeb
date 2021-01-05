const router = [
  {
    path: '/home', component: function (resolve) { require(['VIEWS/home'], resolve); },
    meta: {
      auth: true,
      title: "用户中心"
    }
  },
];

export default router;
