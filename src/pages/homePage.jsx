"use client";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import ChatPage from "./ChatPage";
import app from "@/firebase/config";
import { useRouter } from "next/router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import { Button } from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Cookies from "js-cookie";

export default function homePage() {
  const router = useRouter();

  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  var socket;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName.trim());
        // Cookies.set("userEmail", user.email);
        router.push("/homePage");
      } else {
        router.push("/auth/login");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '40px',
      }}>
        <p style={{
          fontSize: '30px'
        }}>
          Welcome {userName}
        </p>
        <p style={{
            textAlign: 'center'
        }}>This is a demonstration chat application that utilizes a unique room ID and your name. By sharing the same room ID, you can engage in private conversations.</p>      </div>

      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className={styles.main_input}
          type="text"
          placeholder={userName || 'Username'}
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className={styles.main_input}
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
        <button className={styles.main_button} onClick={() => handleJoin()}>
          {!showSpinner ? (
            "Join"
          ) : (
            <div className={styles.loading_spinner}></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      </div>
    </div>
  );
}
