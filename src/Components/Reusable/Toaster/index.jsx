import { Toaster } from "react-hot-toast";

const ToasterArea = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "white",
            color: "black",
            border: "1px solid #3323",
          },
        },
        error: {
          style: {
            background: "red",
            color: "black",
            border: "1px solid #3323",
          },
        },
      }}
    />
  );
};
export default ToasterArea;
