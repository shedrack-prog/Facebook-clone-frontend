import { useState } from 'react';
import { reactToPost } from '../../functions/post';
import { useSelector } from 'react-redux';
const reactsArray = [
  {
    name: 'like',
    image: '../../../reacts/like.gif',
  },
  {
    name: 'love',
    image: '../../../reacts/love.gif',
  },
  {
    name: 'haha',
    image: '../../../reacts/haha.gif',
  },
  {
    name: 'wow',
    image: '../../../reacts/wow.gif',
  },
  {
    name: 'sad',
    image: '../../../reacts/sad.gif',
  },
  {
    name: 'angry',
    image: '../../../reacts/angry.gif',
  },
];

export default function ReactsPopup({
  visible,
  setVisible,
  reactToPostHandler,
}) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => {
                reactToPostHandler(react.name);
                setVisible(false);
              }}
            >
              <img src={react.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
