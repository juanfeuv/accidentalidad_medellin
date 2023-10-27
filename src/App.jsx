import "react-toastify/dist/ReactToastify.css";

import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import theme from "./theme";
import DrawerAppBar from './components/Toolbar'
import Home from './screens/Home/Home';
import NotFound from './screens/NotFound/NotFound';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter >
      <Routes>
        <Route element={<DrawerAppBar />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </BrowserRouter >
  </ThemeProvider>
);

export default App;
