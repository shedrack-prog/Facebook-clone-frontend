import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import LoggedInRoutes from './routes/LoggedInRoute';
import NotLoggedInRoutes from './routes/NotLoggedInRoute';
import ActivateAccount from './pages/home/activateAccount';
import Reset from './pages/reset';
import CreatePostPopup from './compponents/createPostPopup';
import { useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { PostsReducer } from './functions/reducer';
import Friends from './pages/friends';

function App() {
  const [visible, setVisible] = useState(false);
  const { user, theme } = useSelector((state) => ({ ...state }));

  const [{ loading, posts, error }, dispatch] = useReducer(PostsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  const getAllPosts = async () => {
    try {
      dispatch({ type: 'POSTS_REQUEST' });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={theme && 'dark'}>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route
            path="/"
            element={
              <Home
                visible={visible}
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path="/profile"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route path="/activate/:token" element={<ActivateAccount />} exact />
        </Route>

        <Route element={<LoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
