import { Bounce, ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "../../RTK/store";
import 'react-toastify/dist/ReactToastify.css';



export const ErrorToast = () => {

    const error = useAppSelector((state) => state.weatherReducer.error);


    if (error) {
        toast.error(error, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    }

  return (
    <ToastContainer/>
  );
};
