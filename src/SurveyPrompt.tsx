import { useRef, useEffect, useState } from "react";
import qr from "./assets/SurveyForm.png";

export default function SurveyPrompt() {
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
    <div className={display ? "survey-prompt" : "survey-prompt card-hidden"}>
      <img src={qr} alt="" />
      Wala ka sa Listahan. Mag fill up ka kasi ng Form!
    </div>
  );
}
