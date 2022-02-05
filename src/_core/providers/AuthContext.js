import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { auth_api_get_user, auth_api_logout, auth_api_set_csrf_cookie, auth_api_login } from '../api/auth_api';
import history from "../utilities/history"

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState()
  const [user, setUser] = useState()
  const [isCsrfOk, setIsCsrfOk] = useState(false)
  const [status, setStatus] = useState("pending")
  const [authErr, setAuthErr] = useState()
  const location = useLocation

  useEffect(() => {
    const doAuth = async () => {
      setStatus("pending");
      auth_api_set_csrf_cookie()
        .then(res => {
          auth_api_get_user()
            .then(user => {
              setStatus("success");
              setIsAuthed(true);
              setIsCsrfOk(true);
              setUser(user.data);
          })
            .catch(err => {
              setStatus("success")
              setIsAuthed(false)
              setUser()
            });  
        })
        .catch(err => {
          setStatus("error")
          setAuthErr(err.message)
          setIsAuthed(false)
          setUser()
        });      
    }

    doAuth();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthed: isAuthed,
        isCsrfOk: isCsrfOk,
        authErr: authErr,
        status: status,
        setIsAuthed: (val) => setIsAuthed(val),
        user: user,
        setUser: (val) => setUser(val),
        login: async (email, password) => {
          setStatus("pending");
          auth_api_login(email, password)
            .then(() => {
              auth_api_get_user()
                .then(user => {
                  setStatus("success");
                  setIsAuthed(true);
                  setUser(user.data);
                  history.push("/")
                })
            })
            .catch(err => {
              setStatus("error")
              setAuthErr(err.message)
              setIsAuthed(false)
              setUser()
            }); 
        },
        logout: (redirect) => {
          auth_api_logout()
            .then(() => {
              setIsAuthed(false)
              setUser()
              const loc = {
                pathname: '/login',
                state: { from: location }
              }
              if (redirect !== "") {
                history.push(redirect)
              } else {
                history.push(loc)
              }
            })
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}