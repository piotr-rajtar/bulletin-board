export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  users: [
    {
      id: '1',
      name: 'admin',
      permission: 'admin',
    },
    {
      id: '2',
      name: 'user1',
      permission: 'user',
    },
    {
      id: '3',
      name: 'user2',
      permission: 'user',
    },
    {
      id: '4',
      name: 'not logged user',
      permission: 'not authorized',
    },
  ],
};
