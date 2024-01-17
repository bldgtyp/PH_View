import "./styles/App.css";
import "./styles/Sidebar.css";
import theme from "./styles/theme";

import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack className="App" direction="row">
          <Sidebar />
          <Routes>
            <Route path="/PH_View/:projectId/home" element={<Home />} />
            <Route path="/PH_View/:projectId/cert-results" element={<CertificationResults />} />
            <Route path="/PH_View/:projectId/glazing-types" element={<GlazingTypes />} />
            <Route path="/PH_View/:projectId/frame-types" element={<FrameTypes />} />
            <Route path="/PH_View/:projectId/window-unit-types" element={<WindowUnitTypes />} />
            <Route path="/PH_View/:projectId/ventilation" element={<Ventilation />} />
            <Route path="/PH_View/:projectId/pumps" element={<Pumps />} />
            <Route path="/PH_View/:projectId/fans" element={<Fans />} />
            <Route path="/PH_View/:projectId/lighting" element={<Lighting />} />
            <Route path="/PH_View/:projectId/appliances" element={<Appliances />} />
            <Route path="/PH_View/:projectId/materials" element={<Materials />} />
            <Route path="/PH_View/:projectId/constructions" element={<Constructions />} />
            <Route path="/PH_View/:projectId/*" element={<Home />} />
          </Routes>
        </Stack>
      </ThemeProvider>
    </Router>
  );
}

export default App;
