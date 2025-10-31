import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date());
  function monthString(month: number) {
    switch (month) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
    return;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // The cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="time-stat">
      <div className="detail">
        <span>
          {monthString(time.getMonth())} {time.getDate()}, {time.getFullYear()}
        </span>
      </div>

      <div className="logo">
        <img src="/NEU_Logo.png" alt="" />
      </div>

      <div className="detail">
        <span className="time">{time.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
