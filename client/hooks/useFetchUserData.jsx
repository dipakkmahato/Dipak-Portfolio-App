// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUserData } from "../src/redux/slices/userSlice";


// const useFetchUserData = () => {
//   const serverUrl = import.meta.env.VITE_SERVER_URL;
//   const token = localStorage.getItem("token")
//   const loading = useSelector((state) => state.user.loading);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchUserData = async()=>{
//         if(loading) return ;
//         dispatch(setLoading(true));
//         try {
//             const response = await axios.get(`${serverUrl}/api/user/current-user`,{
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (response?.data?.success) {
//                 console.log(response?.data?.user);
//                 dispatch(setUserData(response?.data?.user));
//                 dispatch(setLoading(false));
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setLoading(false))
//         }
//     };
//     fetchUserData(); 
//   }, [serverUrl, token]);
// };

// export default useFetchUserData;



import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoading,
  setUserData,
  setToken,
} from '../src/redux/slices/userSlice';

const useFetchUserData = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    // Logout hone par API call mat karo
    if (!token) {
      dispatch(setUserData(null));
      dispatch(setLoading(false));
      return;
    }

    const controller = new AbortController();

    const fetchUserData = async () => {
      dispatch(setLoading(true));

      try {
        const response = await axios.get(
          `${serverUrl}/api/user/current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (response?.data?.success) {
          dispatch(setUserData(response.data.user));
        }
      } catch (error) {
        if (error.name === 'CanceledError') return;

        console.error(
          'Fetch User Error:',
          error.response?.data || error.message
        );

        // Invalid/expired token: logout
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          dispatch(setToken(null));
          dispatch(setUserData(null));
        }
      } finally {
        if (!controller.signal.aborted) {
          dispatch(setLoading(false));
        }
      }
    };

    fetchUserData();

    return () => {
      controller.abort();
    };
  }, [token, serverUrl, dispatch]);
};

export default useFetchUserData;
