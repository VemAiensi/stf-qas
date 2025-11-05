// import photo from "./assets/photo_placeholder.jpg";
import { useState, useRef, useEffect } from "react";

type student = {
  lastName: string;
  firstName: string;
  middleName: string;
  course: string;
  yearlvl: string;
  picSrc: string;
};

type props = {
  student: student;
};

export default function Card({ student }: props) {
  const timeoutRef = useRef<number | null>(null);
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    // Set a timeout
    timeoutRef.current = setTimeout(() => {
      setDisplay(false);
    }, 10000);

    // Cleanup function: clear the timeout when the component unmounts
    // or when the dependencies of this useEffect change.
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("Timeout cleared!");
      }
    };
  }, []);

  return (
    <div className={display ? "card" : "card card-hidden"}>
      <div className="course-bg"></div>
      <div className="profile-pic">
        <div className="img">
          <img src={student.picSrc} alt="" />
        </div>
      </div>
      <div className="field">
        <div className="label">Last Name</div>
        <div>{student.lastName}</div>
      </div>

      <div className="field">
        <div className="label">First Name</div>
        <div>{student.firstName}</div>
      </div>

      <div className="field">
        <div className="label">Middle Name</div>
        <div>{student.middleName}</div>
      </div>

      <div className="spacer"></div>

      <div className="course">
        <div>{student.course}</div>
      </div>

      <div className="col">
        <div className="label">Year Level</div>
        <div>{student.yearlvl}</div>
      </div>
      <div className="col">
        <div className="label">AEVM Group</div>
        <div>COC2</div>
      </div>
    </div>
  );
}
