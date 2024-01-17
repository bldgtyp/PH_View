import "./styles/App.css";
import "./styles/Sidebar.css";
import theme from "./styles/theme";

import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

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
            <Route path=":projectId/home" element={<Home />} />
            <Route path=":projectId/fans" element={<Fans />} />
            <Route path=":projectId/cert-results" element={<CertificationResults />} />
            <Route path=":projectId/glazing-types" element={<GlazingTypes />} />
            <Route path=":projectId/frame-types" element={<FrameTypes />} />
            <Route path=":projectId/window-unit-types" element={<WindowUnitTypes />} />
            <Route path=":projectId/ventilation" element={<Ventilation />} />
            <Route path=":projectId/pumps" element={<Pumps />} />
            <Route path=":projectId/fans" element={<Fans />} />
            <Route path=":projectId/lighting" element={<Lighting />} />
            <Route path=":projectId/appliances" element={<Appliances />} />
            <Route path=":projectId/materials" element={<Materials />} />
            <Route path=":projectId/constructions" element={<Constructions />} />
            <Route path=":projectId/*" element={<Home />} />
          </Routes>
        </Stack>
      </ThemeProvider>
    </Router>
  );
}

export default App;
