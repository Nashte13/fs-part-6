import { useNotificationStore } from "../notificationStore";
import { Alert } from "@mui/material";

const Notification = () => {
  const style = {
      marginTop: 10,
      marginBottom: 10,
    };
    
    const message = useNotificationStore((state) => state.message)

    if (!message) return null

    return <Alert style={style}>{message} </Alert>;
};

export default Notification;
