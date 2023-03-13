import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Dots, Public } from '../../svg';
import ReactsPopup from './ReactsPopup';
import CreateComment from './CreateComment';
import { useSelector } from 'react-redux';
import PostMenu from './PostMenu';
import { getReacts, reactToPost } from '../../functions/post';
import Comment from './Comment';

export default function Post({ post, profile }) {
  const { user } = useSelector((user) => ({ ...user }));
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [check, setCheck] = useState();
  const [reacts, setReacts] = useState();
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(2);
  const [checkSaved, setCheckSaved] = useState();
  const postRef = useRef(null);

  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    setCheck(res.check);
    setReacts(res.reacts);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const showMore = async () => {
    setCount((prev) => prev + 3);
  };

  useEffect(() => {
    getPostReacts();
  }, [post]);
  const reactToPostHandler = async (type) => {
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
        console.log(reacts);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
        console.log(reacts);
      }
    }
    await reactToPost(type, post._id, user.token);
  };
  return (
    <div
      className="post"
      style={{ width: `${profile && '100%'}` }}
      ref={postRef}
    >
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              <div className="profile_post_names">
                <span>{post.user.first_name}</span>
                <span>{post.user.last_name}</span>
              </div>
              <div className="updated_p">
                {post.type == 'profilePicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } profile picture`}
                {post.type == 'coverPicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length > 0 && (
            <div
              className={
                post.images.length === 1
                  ? 'grid_1'
                  : post.images.length === 2
                  ? 'grid_2'
                  : post.images.length === 3
                  ? 'grid_3'
                  : post.images.length === 4
                  ? 'grid_4'
                  : post.images.length >= 5 && 'grid_5'
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === 'profilePicture' ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        // when a user updates his/her cover photo
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      )}

      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts.map(
                (react, i) =>
                  react.count > 0 && (
                    <img
                      src={`../../../reacts/${react.react}.svg`}
                      alt=""
                      key={i}
                    />
                  )
              )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">
            {comments.length > 0 &&
              `${comments.length} comment${comments.length > 1 ? 's' : ''}`}
          </div>
          <div className="share_count"> 1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactToPostHandler={reactToPostHandler}
        />
        <div
          className="post_action hover1"
          onMouseOver={() =>
            setTimeout(() => {
              setVisible(true);
            }, 500)
          }
          onMouseOut={() =>
            setTimeout(() => {
              setVisible(false);
            }, 500)
          }
          onClick={() => reactToPostHandler(check ? check : 'like')}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: '18px' }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `
          
          ${
            check === 'like'
              ? '#4267b2'
              : check === 'love'
              ? '#f63459'
              : check === 'haha'
              ? '#f7b125'
              : check === 'sad'
              ? '#f7b125'
              : check === 'wow'
              ? '#f7b125'
              : check === 'angry'
              ? '#e4605a'
              : ''
          }
          `,
            }}
          >
            {check ? check : 'Like'}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>share</span>
        </div>
      </div>

      <div className="comments_wrap">
        <div className="comments_order">
          <CreateComment
            user={user}
            postId={post._id}
            setComments={setComments}
            setCount={setCount}
          />
          {comments &&
            comments
              .sort((a, b) => {
                return new Date(b.commentAt) - new Date(a.commentAt);
              })
              .slice(0, count)
              .map((comment, i) => {
                return <Comment key={i} comment={comment} />;
              })}

          {count < comments.length && (
            <div className="view_comments" onClick={() => showMore()}>
              View more comments
            </div>
          )}
        </div>
      </div>
      {showMenu && (
        <PostMenu
          setShowMenu={setShowMenu}
          post={post}
          userId={user.id}
          postUserId={post.user._id}
          postId={post._id}
          token={user.token}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post.images}
          postRef={postRef}
        />
      )}
    </div>
  );
}
