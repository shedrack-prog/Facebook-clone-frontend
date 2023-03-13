import axios from 'axios';

const createPost = async ({ type, background, text, user, token, images }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts`,
      {
        type,
        background,
        text,
        user,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: 'success', data: data };
  } catch (error) {
    return error.response.data.message;
  }
};

const reactToPost = async (react, postId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/posts/postReacts`,
      {
        react,
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: 'success' };
  } catch (error) {
    return error.response.data.message;
  }
};

const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/getReacts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

const submitComment = async ({ comment, image, postId, token }) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/posts/comment`,
      {
        comment,
        image,
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

const savePost = async ({ postId, token }) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/posts/savePost/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
const deletePost = async ({ postId, token }) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/posts/deletePost/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export {
  createPost,
  reactToPost,
  getReacts,
  submitComment,
  savePost,
  deletePost,
};
