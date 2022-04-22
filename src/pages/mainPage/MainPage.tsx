import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { CHECK_USER_PROFILE } from "../../graphql/queries/checkUserProfile";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [getUserProfile, { loading }] = useLazyQuery(CHECK_USER_PROFILE);

  const checkUserId = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await getUserProfile({
      variables: { login: userId },
    });
    data.user ? navigate(`/${userId}`) : setIsErrorVisible(true);
  };

  const changeUserId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setIsErrorVisible(false);
  };

  return (
    <div className="container-lg p-lg-5">
      <div className="d-flex flex-column flex-items-center height-full">
        <div className="f2">enter user id</div>
        <div className={`form-group ${isErrorVisible ? "errored" : ""}`}>
          <form onSubmit={checkUserId}>
            <input
              className="form-control mr-2"
              disabled={loading}
              type="text"
              value={userId}
              onChange={changeUserId}
            />
            {isErrorVisible && (
              <p className="note error" id="username-input-validation">
                Could not find a user
              </p>
            )}
            <button disabled={loading} className="btn" type="submit">
              Confirm
            </button>
          </form>
        </div>
        <div>
          {`or go to `}
          <Link to="/gaearon">Dan Abramov</Link>
          {` profile page.`}
        </div>
      </div>
    </div>
  );
};
