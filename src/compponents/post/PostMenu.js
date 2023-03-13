import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import useClickOutside from '../../helpers/clickOutside';
import { deletePost, savePost } from '../../functions/post';
import { saveAs } from 'file-saver';

export default function PostMenu({
  post,
  userId,
  postUserId,
  setShowMenu,
  postId,
  token,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  const savePostHandler = async () => {
    try {
      setCheckSaved(checkSaved ? false : true);
      const res = await savePost({ postId, token });
    } catch (error) {
      return error.response.data.message;
    }
  };
  const handleDownload = async () => {
    images.map((img) => {
      saveAs(img.url, 'image.jpg');
    });
  };

  const deletePostHandler = async () => {
    try {
      const { data } = await deletePost({ postId, token });
      setTimeout(() => {
        setShowMenu(false);
        postRef.current.remove();
      }, 200);
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <div>
      <ul className="post_menu" ref={menuRef}>
        {test && <MenuItem icon="pin_icon" title="Pin Post" />}
        <div onClick={() => savePostHandler()}>
          {checkSaved ? (
            <MenuItem
              icon="save_icon"
              title="Unsave Post"
              subtitle={'Remove this from your saved items'}
            />
          ) : (
            <MenuItem
              icon="save_icon"
              title="Save Post"
              subtitle={'Add this to your saved items'}
            />
          )}
        </div>
        <div className="line"></div>
        {test && <MenuItem icon="edit_icon" title="Edit Post" />}

        {!test && (
          <MenuItem
            icon="turnOnNotification_icon"
            title="Turn on notifications for this post"
          />
        )}
        {post?.images.length > 0 && (
          <div onClick={() => handleDownload()}>
            <MenuItem icon="download_icon" title="Download " />
          </div>
        )}
        {post?.images?.length > 0 && (
          <MenuItem icon="fullscreen_icon" title="Enter Fullscreen " />
        )}
        {test && (
          <MenuItem img={'../../../icons/lock.png'} title="Edit audience" />
        )}
        {test && (
          <MenuItem
            icon="turnOffNotifications_icon"
            title="Turn off notifications for this post"
          />
        )}
        {test && <MenuItem icon="delete_icon" title="Turn off translation" />}
        {test && <MenuItem icon="date_icon" title="Edit Date" />}
        {test && (
          <MenuItem icon="refresh_icon" title="Refresh share attachment" />
        )}
        {test && <MenuItem icon="archive_icon" title="Move to archive" />}
        {test && (
          <div onClick={() => deletePostHandler()}>
            <MenuItem
              icon="trash_icon"
              title="Move to trash"
              subtitle={'Items in your trash are deleted after 30days '}
            />
          </div>
        )}
        <div className="line"></div>
        {!test && (
          <MenuItem
            img="../../../icons/report.png"
            title="Report post"
            subtitle="i'm concerned about this post"
          />
        )}
      </ul>
    </div>
  );
}
