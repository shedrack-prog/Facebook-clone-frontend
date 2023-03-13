import Picker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { submitComment } from '../../functions/post';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { uploadImages } from '../../functions/uploadImages';
import { ClipLoader } from 'react-spinners';

export default function CreateComment({ user, postId, setComments, setCount }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [error, setError] = useState('');
  const [cursorPosition, setCursorPosition] = useState();
  const [loading, setLoading] = useState(false);
  const commentRef = useRef(null);
  const inputFileRef = useRef(null);

  useEffect(() => {
    commentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = ({ emoji }) => {
    const ref = commentRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  // Image  inputs//////////////////
  const handleImage = (e) => {
    let file = e.target.files[0];

    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} size is too large`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      setCommentImage(readerEvent.target.result);
    };
  };
  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      if (commentImage != '') {
        setLoading(true);
        const img = dataURItoBlob(commentImage);
        const path = `${user.username}/post_images/${postId}`;
        let formData = new FormData();
        formData.append('path', path);
        formData.append('file', img);
        const commentImg = await uploadImages(formData, path, user.token);

        const comments = await submitComment({
          comment: text,
          image: commentImg[0].url,
          postId: postId,
          token: user.token,
        });
        setLoading(false);
        setComments(comments);
        setCount((prev) => ++prev);
        setText('');
        setCommentImage('');
        console.log(comments);
      } else {
        setLoading(true);
        const comments = await submitComment({
          comment: text,
          image: '',
          postId: postId,
          token: user.token,
        });
        setLoading(false);
        setComments(comments);
        setCount((prev) => ++prev);

        setText('');
        setCommentImage('');
        console.log(comments);
      }
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            ref={inputFileRef}
            type="file"
            hidden
            onChange={handleImage}
            accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
          />
          <input
            ref={commentRef}
            type="text"
            placeholder="Write a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
          />
          <div className="comment_circle" style={{ marginTop: '5px' }}>
            <ClipLoader size={20} color="#1876f2" loading={loading} />
          </div>
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError('')}>
                Try again
              </button>
            </div>
          )}
          <div
            className="comment_circle_icon hover2"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => inputFileRef.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>

      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage('')}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
