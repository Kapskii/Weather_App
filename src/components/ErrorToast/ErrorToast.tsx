import { Bounce, ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../RTK/store";
import 'react-toastify/dist/ReactToastify.css';
import { removeError } from "../../RTK/weatherSlice";



export const ErrorToast = () => {

    const error = useAppSelector((state) => state.weatherReducer.error);
    const dispatch = useAppDispatch();

    if (error) {
        toast.error(error, {
            position: "bottom-left",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce,
            });
        dispatch(removeError())
  }

  return (
    <ToastContainer />
  );
};
