import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Markdown from "marked-react";

import { GET_USER_PROFILE } from "../../graphql/queries/getUserProfile";

export const ProfilePage: React.FC = () => {
  let params = useParams();

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { login: params.userId },
  });

  if (loading) {
    return <div className="container-lg p-lg-5">Loading...</div>;
  }

  if (error) {
    return <div className="container-lg p-lg-5">`Error! ${error.message}`</div>;
  }

  return (
    <div className="container-lg p-lg-5 clearfix">
      <div className="col-4 float-left pr-4">
        <img
          className="avatar avatar-user border color-bg-default mb-3"
          style={{ height: "auto", borderRadius: "50%" }}
          width="100%"
          src={data.user.avatarUrl}
        ></img>
        <p className="h2 lh-condensed mb-0">{data.user.name}</p>
        <p className="f3-light lh-condensed mb-3">{data.user.login}</p>
        <input type="submit" value="Follow" className="btn btn-block mb-3" />
        <p className="f5 lh-condensed mb-3">
          <svg
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            className="octicon octicon-people"
          >
            <path
              fillRule="evenodd"
              d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
            ></path>
          </svg>{" "}
          <span className="text-bold">{data.user.followers.totalCount}</span>{" "}
          followers ·{" "}
          <span className="text-bold">{data.user.following.totalCount}</span>{" "}
          following
        </p>
        {data.user.email && (
          <p className="f5 lh-condensed">
            <svg
              className="octicon octicon-mail"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
            >
              <path
                fillRule="evenodd"
                d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
              ></path>
            </svg>{" "}
            {data.user.email}
          </p>
        )}
        {data.user.twitterUsername && (
          <p className="f5 lh-condensed mb-3">
            <svg
              className="octicon"
              viewBox="0 0 273.5 222.3"
              version="1.1"
              width="16"
              height="16"
            >
              <title id="cwiuwtln28pzvw1t6k5d7c69mftvuon">Twitter</title>
              <path
                fillRule="evenodd"
                d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
              ></path>
            </svg>{" "}
            @{data.user.twitterUsername}
          </p>
        )}
      </div>
      <div className="col-8 float-left">
        {data.user.repositories.nodes.map((repository: any) => (
          <div className="py-4 border-bottom">
            <div className="f3 text-bold mb-1">{repository.nameWithOwner}</div>
            <div className="f5 mb-2">
              <Markdown value={repository.description} />
            </div>
            {repository.languages.nodes[0] && (
              <div className="f6">{repository.languages.nodes[0].name}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
