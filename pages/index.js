/* eslint-disable @next/next/link-passhref */
import styles from "../styles/home.module.css";
import logo from "../public/logo.png";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Link from "next/link";
const ADMIN = "0x847Bc3f097Ba89f3e46FE8Aa05Ae80149C4D89E2";
let linkAddress;
export default function Home() {
  const router = useRouter();
  const { authenticate, authError, isAuthenticated, user, Moralis, logout } =
    useMoralis();
  // if (authError) alert(`${authError.name} ${authError.message}`);
  return (
    <>
      <div className={styles.parent_Welcome}>
        <div className={styles.navbar}>
          <div className={styles.logos}>
            <div>
              <Image src={logo} alt="EtherX" height="40px" width="40px" />
            </div>
            <div className={styles.dummy}></div>
            <div className={styles.logoName}>EtherX</div>
          </div>

          <div className={styles.buttons}>
            {authError && (
              <div>
                {authError.name}
                {authError.message}
              </div>
            )}
            <Link
              href={
                isAuthenticated && user.attributes.ethAddress == ADMIN
                  ? "/admin"
                  : "/"
              }
            >
              <button
                disabled={isAuthenticated}
                id="wallet"
                className={styles.walletBtn}
                onClick={authenticate}
              >
                {isAuthenticated
                  ? `${user.attributes.ethAddress} Connected`
                  : "Connect Wallet"}
              </button>
            </Link>

            <div></div>

            <button
              id="admin"
              className={styles.adminBtn}
              onClick={isAuthenticated ? logout : authenticate}
            >
              {!isAuthenticated ? "Admin" : "Logout"}
            </button>
          </div>
        </div>
        <div className={styles.welcome_msg}>
          <h1>Welcome to EtherX</h1>
        </div>
        <div className={styles.choose_profile}>
          <div className={styles.profile_investor}>
            <a
              className={styles.investorCase}
              onClick={() => {
                if (isAuthenticated) router.push("/investor");
                else alert("Connect wallet first!");
              }}
            >
              I want to Invest
            </a>
          </div>
          <div className={styles.profile_asker}>
            <a
              className={styles.askerCase}
              onClick={() => {
                if (isAuthenticated) router.push("/asker");
                else alert("Connect wallet first!");
              }}
            >
              I want Funding
            </a>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
