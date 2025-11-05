import { useState } from "react";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.tsx";

export default function AppRoutes() {
  const [accessToken, setToken] = useState("");
  const [attendanceSheetId, setAttendanceId] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login setToken={setToken} setAttendanceId={setAttendanceId} />
          }
        />
        <Route
          path="/qas"
          element={
            <App accessToken={accessToken} attendanceId={attendanceSheetId} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
