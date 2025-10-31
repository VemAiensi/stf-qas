import "./App.css";
import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Time from "./Time";
import Wait from "./Wait";
import Loading from "./Loading";
// import { motion } from "motion/react";

type student = {
  lastName: string;
  firstName: string;
  middleName: string;
  course: string;
  yearlvl: string;
};

function App() {
  const [code, setCode] = useState<string>("");
  const apiExec = import.meta.env.VITE_WEB_EXEC;
  const [manual, setManual] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [detailDisplay, setDetailDisplay] = useState<boolean>(true);

  useEffect(() => {
    new Promise(() => {
      setTimeout(() => {
        setManual(false);
      }, 3000);
    });
  }, []);

  const [student, setStudent] = useState<student | null>(null);

  // const [lastName, setLastName] = useState<string>("");
  // const [firstName, setFirstName] = useState<string>("");
  // const [middleName, setMiddleName] = useState<string>("");

  const [loading, setLoading] = useState(false);

  async function fetchDetails() {
    setLoading(true);
    const result = await fetch(apiExec + `?id=${code}`);

    const value = await result.json();

    console.log(value);
    const student: student = {
      lastName: value.lastName,
      firstName: value.firstName,
      middleName: value.middleName,
      course: value.course,
      yearlvl: value.year,
    };

    setStudent(student);
    setLoading(false);
  }

  return (
    <div
      className="container"
      // onKeyDown={(e) => {
      //   if (e.key === "m") {
      //     console.log(e.key, "manual mode");
      //     setCode("");
      //   }
      // }}
    >
      <div className="main-window">
        {/* <div className="header">
          <img src="/NEU_Logo.png" alt="" />
        </div> */}
        {/* <div className="title">BUWANANG PANATA</div> */}

        <Time></Time>

        <div className="activity">
          {loading ? <Loading /> : student ? <Card student={student} /> : <></>}
          <Wait />
        </div>

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

        <button className="show-config">Gear</button>

        <form
          onSubmit={async (e) => {
            setManual(false);
            e.preventDefault();
            // alert(code);
            await fetchDetails();
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
