import { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import { Route, Routes, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import UpcomingEvents from './pages/UpcomingEvents';
import routes from './routes';
import { useAuthStore } from './store';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const { access, refresh, isAuthenticated, setAuthenticated, logIn, updateAccess } = useAuthStore() as {
    access: string | null,
    refresh: string | null,
    isAuthenticated: boolean,
    setAuthenticated: (state: boolean) => void,
    logIn: (access: string, refresh: string) => void,
    updateAccess: (newAccess: string) => void,
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState<boolean>(false);
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const queryParams = new URLSearchParams(location.search);
    const access = queryParams.get('access');
    const refresh = queryParams.get('refresh');
    if (access && refresh) {
      logIn(access, refresh);
      navigator('/');
    }

    setHasCheckedAuth(true);
  }, [location]);

  useEffect(() => {
    if (access !== null && refresh !== null) {
      setAuthenticated(true);
      setHasCheckedAuth(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      axios.defaults.headers.common['Refresh'] = refresh
    } else {
      setAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Refresh'];
    }
  }, [access, refresh]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => {
        if (response.data.access) {
          updateAccess(response.data.access);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        }
        return response;
      },
      error => {
        if (error.response && error.response.status === 401) {
          setAuthenticated(false);
          navigator('/auth/signin');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [setAuthenticated, navigator, updateAccess]);

  useEffect(() => {
    if (hasCheckedAuth && !isAuthenticated) {
      navigator('/auth/signin');
    }
  }, [isAuthenticated, hasCheckedAuth])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route element={<DefaultLayout><Outlet /></DefaultLayout>}>
          <Route index element={<UpcomingEvents />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
