import React, {useState} from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Flash.module.css";
import Image from "next/image";
import { Button } from "@mui/material";

export default function FlashScreen() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false) ;
  const [isLoading, setIsLoading] = useState(false) ;

  const handleLetsGoBtn = () => {
    if (isLogin) {
      router.push("/homePage");
    } else {
      router.push("/auth/login");
    }
    setIsLoading(true);
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1
            style={{
              fontFamily: "var(--font-secondary)",
            }}
          >
            Chatify
          </h1>
        </div>
        <div className={styles.img}>
          <Image
            width={400}
            height={400}
            src={"/img/welcomePage/sendingMessage.svg"}
            alt="send sms img"
          />
        </div>
        <div className={styles.titleDesc}>
          <p>more then just words, it&apos;s a lifestyle</p>
        </div>
        <div className={styles.btn}>
          <Button
            variant="contained"
            onClick={handleLetsGoBtn}
            sx={{
              backgroundColor: "var(--bg-primary)",
              width: "200px",
              fontFamily: "var(--font-primary)",
              "&:hover": {
                backgroundColor: "var(--bg-primary)",
              },
              "&:focus": {
                backgroundColor: "var(--bg-primary)",
              },
            }}
          >
            Let&apos;s Connect
          </Button>
        </div>
      </div>
    </>
  );
}
