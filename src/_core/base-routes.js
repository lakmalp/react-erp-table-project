let routes = [
  {
    path: '/login',
    page: 'Login',
    folder: '_core/screens',
    isPrivate: false,
    exact: true,
    grant: 'auth.login'
  },
  {
    path: '/404',
    page: 'NotFound',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'auth.notfound'
  },
  {
    path: '/',
    page: 'Home',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'auth.home'
  },
  // {
  //   path: '/changePassword',
  //   page: 'ChangePassword',
  //   folder: '_core/pages',
  //   isPrivate: true,
  //   exact: true,
  //   grant: 'auth.changePassword'
  // },
  // {
  //   path: '/settings',
  //   page: 'Settings',
  //   folder: '_core/pages',
  //   isPrivate: true,
  //   exact: true,
  //   grant: 'settings'
  // },
  // {
  //   path: '/viewUserSessions',
  //   page: 'LoginHistory',
  //   folder: '_core/pages',
  //   isPrivate: true,
  //   exact: true,
  //   grant: 'auth.viewUserSessions'
  // }
];

export default routes