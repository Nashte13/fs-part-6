import { useNotificationStore } from "../notificationStore";
import { Alert } from "@mui/material";

const Notification = () => {
  const style = {
      marginTop: 10,
      marginBottom: 10,
    };
    
    const notification = useNotificationStore((state) => state.notification);

    if (!notification.message) return null

    return <Alert severity={notification.type} style={style}>{notification.message} </Alert>;
};

export default Notification;
