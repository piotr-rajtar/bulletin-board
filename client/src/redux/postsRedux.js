import Axios from 'axios';

/* selectors */
export const getAllPosts = ({posts}) => {
  posts.data
    .filter(post => post.status === 'active')
    .sort((date1,date2) => {
      const dateA = new Date(date1.updated);
      const dateB = new Date(date2.updated);

      return dateB.getTime() - dateA.getTime();
    });
  return posts.data;
};

export const getPostById = ({posts}, postId) => {
  const postData = posts.data.filter(post => post._id === postId);
  return postData[0];
};

export const getPostsByUser = ({posts}, userId) => {

  if(posts.data.length > 0) {
    const postData = posts.data.filter(post => post.userId === userId);
    return postData;
  } else {
    return {};
  }
};

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');
const GET_POST = createActionName('GET_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const updatePost = payload => ({ payload, type: UPDATE_POST });
export const getPost = payload => ({ payload, type: GET_POST });

/* thunk creators */

export const getActivePostsRequest = () => {
  return (dispatch, getState) => {

    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const getPostData = (id) => {
  return (dispatch) => {

    dispatch(fetchStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostData = (data) => {
  return async dispatch => {

    dispatch(fetchStarted());
    await Axios
      .post('http://localhost:8000/api/posts',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        dispatch(addPost(res.data));

      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data.map(post => post.id === action.payload.id?  action.payload  : post ),
        ],
      };
    }
    default:
      return statePart;
  }
};
