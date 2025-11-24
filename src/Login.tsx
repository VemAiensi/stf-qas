import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";
import googleIcon from "./assets/googleIcon.png";

type props = {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setAttendanceId: React.Dispatch<React.SetStateAction<string>>;
};

export default function Login({ setToken, setAttendanceId }: props) {
  const [idInput, setId] = useState("");
  const [inputDisplay, setDisplay] = useState<boolean>(false);

  const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" ");

  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: SCOPES,
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setToken(tokenResponse.access_token);
      setDisplay(true);
      // navigate("/qas");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="welcome-text">
          <img src="./NEU_Logo.png" alt="" />
          {inputDisplay ? (
            <p>Please insert Attendance Sheet Id</p>
          ) : (
            <p>Welcome to AEVM QAS</p>
          )}
        </div>

        <div
          className={inputDisplay ? "credential-grid moved" : "credential-grid"}
        >
          <div
            className={inputDisplay ? "transparent" : "visible"}
            // style={{ backgroundColor: "red" }}
          >
            <button
              onClick={() => {
                login();
              }}
            >
              <img src={googleIcon} alt="" />
              <span>Log in with Google</span>
            </button>
          </div>
          <div
            className={inputDisplay ? "visible" : "transparent"}
            // style={{ backgroundColor: "green" }}
          >
            <input
              type="text"
              value={idInput}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />

            <button
              disabled={idInput === "" ? true : false}
              onClick={() => {
                setAttendanceId(idInput);
                navigate("/qas");
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
