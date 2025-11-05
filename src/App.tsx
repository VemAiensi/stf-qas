import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Time from "./Time";
import Wait from "./Wait";
import Loading from "./Loading";
import SurveyPrompt from "./SurveyPrompt";

type student = {
  lastName: string;
  firstName: string;
  middleName: string;
  course: string;
  group: string;
  yearlvl: string;
  picSrc: string;
};

type props = {
  accessToken: string;
  attendanceId: string;
};

function App({ accessToken, attendanceId }: props) {
  const [code, setCode] = useState<string>("");
  const [manual, setManual] = useState(true);
  const [student, setStudent] = useState<student | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState(true);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    //check for access token first
    if (accessToken === "") {
      navigate("/");
    } else {
      setTimeout(() => {
        setManual(false);
      }, 3000);
    }
  }, [accessToken, navigate]);

  async function fetchDetails(studentId: string) {
    setLoading(true);

    //just a flag - used to disable immediate showcase of survey form
    if (firstLaunch) setFirstLaunch(false);

    //App Script Execution
    const requestBody = {
      function: "getStudentDetails",
      parameters: [studentId, attendanceId],
      devMode: true,
    };

    const result = await fetch(import.meta.env.VITE_API_EXEC, {
      method: "POST", // API Executables always use POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await result.json();
    if (data.response.result) {
      const details = data.response.result;
      console.log(data);
      setStudent({
        firstName: details.firstName,
        lastName: details.lastName,
        middleName: details.middleName,
        yearlvl: details.year,
        course: details.course,
        group: details.group,
        picSrc: details.picture,
      });
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="main-window">
        {/* <div className="header">
          <img src="/NEU_Logo.png" alt="" />
        </div> */}
        {/* <div className="title">BUWANANG PANATA</div> */}

        <Time></Time>

        <div className="activity">
          {loading ? (
            <Loading />
          ) : student ? (
            <Card student={student} />
          ) : (
            !firstLaunch && <SurveyPrompt />
          )}
          <Wait />
        </div>

        {/* <button
          onClick={() => {
            console.log(accessToken);
            fetchDetails("21-11295-31");
          }}
        >
          try fetching me
        </button> */}

        <div className="copyright">
          © 2025 New Era University. All rights reserved.
        </div>
      </div>

      <div className={manual ? "manual-tab" : "manual-tab hidden "}>
        <div className="show">
          <button
            className="show-btn"
            type="button"
            onClick={async () => {
              if (manual) {
                if (inputRef.current) {
                  inputRef.current.focus({ preventScroll: true });
                }
                setTimeout(() => {
                  setManual(!manual);
                }, 400);
              } else {
                setManual(!manual);

                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus({ preventScroll: true });
                  }
                }, 400);
              }
            }}
          >
            ^
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            setManual(false);
            e.preventDefault();
            // alert(code);
            await fetchDetails(code);
            setCode("");
          }}
        >
          <label htmlFor="code">ID:</label>
          <input
            ref={inputRef}
            name="code"
            autoFocus
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default App;
