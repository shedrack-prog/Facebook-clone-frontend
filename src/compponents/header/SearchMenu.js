import React, { useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../svg';
import useClickOutside from '../../helpers/clickOutside';
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from '../../functions/user';
import { Link } from 'react-router-dom';

export default function SearchMenu({
  inputRef,
  color,
  setShowSearchMenu,
  token,
}) {
  const menuRef = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    inputRef?.current.focus();
  }, []);
  useEffect(() => {
    getHistory();
  }, []);

  const searchHandler = async () => {
    if (searchTerm === '') {
      setSearchResults('');
      return;
    } else {
      const response = await search({ searchTerm, token });
      setSearchResults([...response]);
      console.log(searchResults);
    }
  };

  const addToSearchHistoryHandler = async (searchUser) => {
    const { data } = await addToSearchHistory({ searchUser, token });
  };

  const getHistory = async () => {
    const response = await getSearchHistory(token);
    setSearchHistory(response);
  };

  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, token);
    getHistory();
  };
  useClickOutside(menuRef, () => setShowSearchMenu(false));
  return (
    <div className="header_left search_area scrollbar" ref={menuRef}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div className="search">
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a href="#">Edit</a>
      </div>
      <div className="search_history">
        {searchHistory &&
          searchResults == '' &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {searchResults &&
          searchResults.map((user) => (
            <Link
              to={`profile/${user.username}`}
              className="search_user_item hover1"
              key={user._id}
              onClick={() => addToSearchHistoryHandler(user._id)}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
