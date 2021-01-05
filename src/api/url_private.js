const PRIVATE_URL = {
  LOGIN:'/user/login/',// 登录
  USERINFO(id){
    return `/user/${id}/`
  }
};

export {PRIVATE_URL};
