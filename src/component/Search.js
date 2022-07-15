import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

export default function ShowProject() {
  const { isLoading, error, data } = useQuery(
    "users",
    async () => await axios("https://api.github.com/users").then((res) => res)
  );
  const [searchedVal, setSearchedVal] = useState("ok");
  const {register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (inputText) => {
    setSearchedVal(inputText.searchName);
}
  //console.log(data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <p>Search User Name: 

          <input
            {...register("searchName", {
              required: true,
              minLength: 3,
              maxLength: 100,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          <input type="submit" /></p>
          <p>
            {errors.searchName && (
              <span style={{ color: "red" }}>
                Follow All Validation Rules:
                <ul>
                  <li>Field Not Black</li>
                  <li>Enter Minimum 3 charectors</li>
                  <li>Enter maximum 100 charectors</li>
                  <li>Enter Only charectors</li>
                </ul>
              </span>
            )}
          </p>
        </form>
        <hr/>
        <h2>Search Result:</h2>

        <table border="1" height="100%" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile Pic</th>
              <th>Name</th>
              <th>Check Profile</th>
            </tr>
          </thead>
          <tbody>
            {data.data
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.login
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.avatar_url} height="50" width="50" />
                  </td>
                  <td>{item.login}</td>
                  <td>
                    <a href={item.html_url}>View Profile</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
