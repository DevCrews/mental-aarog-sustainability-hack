import axios from "axios";
import React, { useState, useEffect } from "react";
import DesoIdentity from "./desoIdentityApi";
import DesoApi from "./desoApi";

let PUBLIC_KEY = "";

const instance = axios.create({
  baseURL: "https://api.desodev.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const getBalance = async (publicKey) => {
  let balance = 0;
  await instance
    .post("/api/v1/balance", {
      PublicKeyBase58Check: publicKey,
    })
    .then((res) => JSON.parse(res))
    .then((res) => {
      balance = res.ConfirmedBalanceNanos;
    });
  return balance;
};

const getComments = async (publicKey) => {
  let comments = null;
  await instance
    .post("/api/v0/get-single-profile", {
      PublicKeyBase58Check: publicKey,
    })
    .then((res) => JSON.parse(res))
    .then((res) => (comments = res.comments));
  return comments;
};

export default { getBalance, getComments };

// const [loggedIn, setLoggedIn] = useState(false)
// const [toUsername, setToUsername] = useState("@Prithika")
// const [publicKey, setSetPublicKey] = useState(null)
// const [desoIdentity, setDesoIdentity] = useState(null)
// const [desoApi, setDesoApi] = useState(null)

//   const di = new DesoIdentity();
//   const da = new DesoApi();

// const login = async () => {
//   const user = await desoIdentity.loginAsync(4)
//   setSetPublicKey(user.publicKey)
//   setLoggedIn(true)
// }
// const logout = async () => {
//   const result = await desoIdentity.logout(publicKey)
//   setSetPublicKey(null)
//   setLoggedIn(false)
// }
