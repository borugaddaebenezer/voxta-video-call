import { Route, Routes, Navigate } from "react-router";

import HomePage from "./pages/HomePage.jsx"; 
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

export default function App() {
  const {isLoading, authUser } = useAuthUser();
  const { theme, setTheme } = useThemeStore();
  

  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnboarded;
 
  if(isLoading) return <PageLoader />
  //zustand for theme
  //tanstack query
  //react hot toast
  return (
    <div className="min-h-screen bg-base-100" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnBoarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated? "/login" : "/onboarding"}/>
        ) }/>
        <Route path="/login" element={!isAuthenticated? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/signup" element={!isAuthenticated? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/onboarding" element={
          isAuthenticated?(
            !isOnBoarded ? (
              <OnboardingPage/>
            ):(<Navigate to="/"/>)
          ):(<Navigate to="/login"/>)
        } />

        <Route path="/call/:id" element={
          isAuthenticated && isOnBoarded? (
            <CallPage />
          ):(
            <Navigate to={!isAuthenticated? "/login" : "/onboarding"} />
          )} />
        <Route path="/chat/:id" element= {
          isAuthenticated && isOnBoarded ? (
            <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
          ):(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }/>
        <Route path="/notifications" 
            element={isAuthenticated && isOnBoarded ?(
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (<Navigate to={!isAuthenticated?"/login":"/onboarding"} />) } />
      </Routes>
      <Toaster />
    </div>
  )
};
