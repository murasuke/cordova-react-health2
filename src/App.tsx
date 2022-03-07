import React, { VFC } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.scss';
import RequireAuth from 'components/RequireAuth';
import FixedMenuLayout from 'pages/FixedMenuLayout';
import StepDayGraph from 'pages/StepDayGraph';
import StepWeekGraph from 'pages/StepWeekGraph';
import Home from 'pages/Home';
import About from 'pages/About';
import Contact from 'pages/Contact';
import LoginPage from 'pages/LoginPage';

const App: VFC = () => {
  return (
    <FixedMenuLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="daygraph"
          element={
            <RequireAuth>
              <StepDayGraph />
            </RequireAuth>
          }
        >
          <Route
            path=":term"
            element={
              <RequireAuth>
                <StepDayGraph />
              </RequireAuth>
            }
          ></Route>
        </Route>
        <Route
          path="weekgraph"
          element={
            <RequireAuth>
              <StepWeekGraph />
            </RequireAuth>
          }
        />
        <Route path="signin" element={<LoginPage moveTo="/" />} />
      </Routes>
    </FixedMenuLayout>
  );
};

export default App;
