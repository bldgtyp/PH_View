import React from "react";

import "./styles/App.css";
import "./styles/Sidebar.css";
import theme from "./styles/theme";

import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes, HashRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./components/Pages/Home";
import CertificationResults from "./components/Pages/CertificationResults";
import GlazingTypes from "./components/Pages/GlazingTypes";
import FrameTypes from "./components/Pages/FrameTypes";
import WindowUnitTypes from "./components/Pages/WindowUnitTypes";
import Ventilation from "./components/Pages/Ventilation";
import Pumps from "./components/Pages/Pumps";
import Fans from "./components/Pages/Fans";
import Lighting from "./components/Pages/Lighting";
import Appliances from "./components/Pages/Appliances";
import Materials from "./components/Pages/Materials";
import Constructions from "./components/Pages/Constructions";

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  return <HashRouter>{children}</HashRouter>;
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack className="App" direction="row">
          <Sidebar />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="cert-results" element={<CertificationResults />} />
            <Route path="glazing-types" element={<GlazingTypes />} />
            <Route path="frame-types" element={<FrameTypes />} />
            <Route path="window-unit-types" element={<WindowUnitTypes />} />
            <Route path="ventilation" element={<Ventilation />} />
            <Route path="pumps" element={<Pumps />} />
            <Route path="fans" element={<Fans />} />
            <Route path="lighting" element={<Lighting />} />
            <Route path="appliances" element={<Appliances />} />
            <Route path="materials" element={<Materials />} />
            <Route path="constructions" element={<Constructions />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Stack>
      </ThemeProvider>
    </Router>
  );
}

export default App;
