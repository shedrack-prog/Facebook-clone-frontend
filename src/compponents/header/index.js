import './styles.css';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';

import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import useClickOutside from '../../helpers/clickOutside';
import UserMenu from './userMenu';

export default function Header({ page, getAllPosts }) {
  const inputRef = useRef(null);
  const allMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const { user } = useSelector((user) => ({ ...user }));
  const color = '#65676B';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useClickOutside(allMenuRef, () => setShowAllMenu(false));
  useClickOutside(userMenuRef, () => setShowUserMenu(false));

  return (
    <header>
      <div className="header_left">
        <Link className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>

        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
            inputRef.current.focus();
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          inputRef={inputRef}
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user.token}
        />
      )}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === 'home' ? 'active' : 'hover1'}`}
          onClick={() => getAllPosts()}
        >
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === 'friends' ? 'active' : 'hover1'}`}
        >
          {page === 'friends' ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1 ">
          <Gaming color={color} />
        </Link>
      </div>

      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === 'profile' ? 'active_link' : ''
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && 'active_header'}`}
          ref={allMenuRef}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: 'translateY(2px)' }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'} `}
          ref={userMenuRef}
        >
          <div>
            <div
              style={{ transform: 'translateY(2px)' }}
              onClick={() => {
                setShowUserMenu((prev) => !prev);
              }}
            >
              <ArrowDown />
            </div>
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}