import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import CreatePost from '../../compponents/createPost';
import Header from '../../compponents/header';
import LeftHome from '../../compponents/home/left';
import RightHome from '../../compponents/home/right';
import SendVerification from '../../compponents/home/sendVerification';
import Stories from '../../compponents/home/stories';
import Post from '../../compponents/post';
import './styles.css';
export default function Home({
  setVisible,
  posts,
  loading,
  getAllPosts,
  dispatch,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const middleRef = useRef(null);
  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(middleRef.current.clientHeight);
  }, [loading, height]);

  return (
    <div className="home" style={{ height: `${height + 150}px ` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middleRef}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} dispatch={dispatch} />
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts &&
              posts.map((post, i) => <Post key={i} post={post} user={user} />)}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
