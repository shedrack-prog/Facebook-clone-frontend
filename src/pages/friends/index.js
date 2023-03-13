import './styles.css';
import Header from '../../compponents/header';
import { Link, useParams } from 'react-router-dom';
import { FriendsActive } from '../../svg';
import { getFriendsPageInfos } from '../../functions/user';
import { useSelector } from 'react-redux';
import { useEffect, useReducer } from 'react';
import { FriendsInfo } from '../../functions/reducer';
import Card from './Card';
export default function Friends() {
  const { type } = useParams();

  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, data, error }, dispatch] = useReducer(FriendsInfo, {
    loading: false,
    data: [],
    error: '',
  });
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    dispatch({ type: 'FRIENDS_REQUEST' });
    const data = await getFriendsPageInfos(user.token);
    if (data.status === 'ok') {
      dispatch({ type: 'FRIENDS_SUCCESS', payload: data.data });
    } else {
      dispatch({ type: 'FRIENDS_ERROR', payload: data.data });
    }
  };
  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Friends</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <Link
              to="/friends"
              className={`mmenu_item hover3 ${
                type === undefined && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon "></i>
              </div>
              <span>Home</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`mmenu_item hover3 ${
                type === 'requests' && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`mmenu_item hover3 ${
                type === 'sent' && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <Link
              to="/friends/all"
              className={`mmenu_item hover3 ${
                type === 'all' && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom Lists</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends_right">
          {(type === undefined || type === 'requests') &&
          data.requests &&
          data.requests.length > 0 ? (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends Requests </h3>
                <a className="see_link hover3">See all</a>
              </div>
              <div className="flex_wrap">
                {data.requests &&
                  data.requests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="request"
                      getUserData={getUserData}
                    />
                  ))}
              </div>
            </div>
          ) : (
            (type === undefined || type === 'requests') && (
              <h2
                className="bottomBorder"
                style={{
                  fontSize: '20px',
                }}
              >
                No Friend Requests
              </h2>
            )
          )}
          {(type === undefined || type === 'sent') &&
          data.sentRequests &&
          data.sentRequests.length > 0 ? (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests </h3>
                <a className="see_link hover3">See all</a>
              </div>
              <div className="flex_wrap">
                {data.sentRequests &&
                  data.sentRequests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="sent"
                      getUserData={getUserData}
                    />
                  ))}
              </div>
            </div>
          ) : (
            (type === undefined || type === 'sent') && (
              <h2
                className="bottomBorder"
                style={{
                  fontSize: '20px',
                }}
              >
                No requests sent
              </h2>
            )
          )}
          {(type === undefined || type === 'all') &&
          data.friends &&
          data.friends.length > 0 ? (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends </h3>
                <a className="see_link hover3">See all</a>
              </div>
              <div className="flex_wrap">
                {data.friends &&
                  data.friends.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="friends"
                      getUserData={getUserData}
                    />
                  ))}
              </div>
            </div>
          ) : (
            (type === undefined || type === 'friends') && (
              <h2
                className="bottomBorder"
                style={{
                  fontSize: '20px',
                }}
              >
                No Friends
              </h2>
            )
          )}
        </div>
      </div>
    </>
  );
}
