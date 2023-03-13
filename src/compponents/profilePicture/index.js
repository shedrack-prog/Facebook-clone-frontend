import { useRef, useState } from 'react';
import './styles.css';
import UpdateProfilePicture from './UpdateProfilePicture';
import useOnClickOutside from '../../helpers/clickOutside';
import { useSelector } from 'react-redux';
export default function ProfilePicture({ username, setShow, photos, pRef }) {
  const popup = useRef(null);
  useOnClickOutside(popup, () => setShow(false));
  const refInput = useRef(null);
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
      />

      <div
        className={`postBox pictureBox ${image && 'hide_popup'}`}
        // ref={popup}
      >
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError('')}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>your profile pictures </h4>
          <div className="old_pictures">
            {photos
              ?.filter(
                (photo) => photo.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>other pictures</h4>
          <div className="old_pictures">
            {photos
              ?.filter(
                (photo) => photo.folder !== `${user.username}/profile_pictures`
              )
              .map((img) => (
                <img
                  src={img.secure_url}
                  key={img.public_id}
                  alt=""
                  onClick={() => setImage(img.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>

      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setShow={setShow}
          setError={setError}
          pRef={pRef}
        />
      )}
    </div>
  );
}
