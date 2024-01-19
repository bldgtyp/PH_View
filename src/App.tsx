import "./styles/App.css";
import "./styles/Sidebar.css";
import theme from "./styles/theme";

import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import GlazingTypes from "./pages/GlazingTypes";
import FrameTypes from "./pages/FrameTypes";
import WindowUnitTypes from "./pages/WindowUnitTypes";
import Ventilation from "./pages/Ventilation";
import Pumps from "./pages/Pumps";
import Fans from "./pages/Fans";
import Lighting from "./pages/Lighting";
import Appliances from "./pages/Appliances";
import Materials from "./pages/Materials";
import Constructions from "./pages/Constructions";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack className="App" direction="row">
          <Sidebar />
          <Routes>
            <Route path=":projectId/home" element={<Home />} />
            <Route path=":projectId/cert-results" element={<Results />} />
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
