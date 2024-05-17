"use client";
import React, { useState, useEffect } from "react";
import app from "@/firebase/config";
import { useRouter } from "next/router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import { Button } from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Cookies from 'js-cookie';
const login = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        Cookies.set('userName',  user.displayName.trim());
        Cookies.set('userEmail', user.email);
        router.push("/homePage");
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          Cookies.set('userName',  user.displayName.trim());
          Cookies.set('userEmail', user.email);
          router.push("/homePage");
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log("Error signing with Google", error);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          height: "100vh",
        }}
      >
        <div>
          <GppGoodIcon
            sx={{
              width: "50px",
              height: "50px",
            }}
          />
        </div>
        <h1>Log in or Sign up</h1>
        <p
          style={{
            fontSize: "16px",
          }}
        >
          Use your email or other service to continue with us
        </p>
        <div
          style={{
            padding: "10px",
          }}
        >
          <Button
            variant="primary"
            onClick={signInWithGoogle}
            startIcon={<Image width={20} height={20} src={"/img/google.png"} alt="img" />}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "500",
              textTransform: "capitalize",
              borderRadius: '12px',
              width: '300px',
              height: '50px',
            }}
          >
            Continue with google
          </Button>
        </div>
      </div>
    </>
  );
};

export default login;
