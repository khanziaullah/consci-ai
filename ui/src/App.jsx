import React from "react";
import { ChatScreen } from "./components/ChatScreen";
import { ProjectDetails } from "./components/ProjectDetails";
import { Login } from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ReportPage from "./components/ReportPage/ReportPage";
import CertificateTemplate from "./components/Certificate/CertificateTemplate";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/chatScreen" element={<ChatScreen />}></Route>
        <Route path="/projectDetails" element={<ProjectDetails />}></Route>
        <Route path="/projectReport" element={<ReportPage />}></Route>
        <Route path="/certificate" element={<CertificateTemplate />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
