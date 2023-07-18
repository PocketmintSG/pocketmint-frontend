import {
  NOTIFICATION_CONTAINER,
  NOTIFICATION_INSERTION,
  NOTIFICATION_TYPE,
  Store,
} from "react-notifications-component";

export const triggerWIPNotification = (
  message: string = "This feature is a work in progress!",
) => {
  Store.addNotification({
    title: "Work in Progress!",
    message: message.toString(),
    type: "info",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
    },
  });
};

export const triggerGenericNotification = (
  title: string,
  message: string,
  type: NOTIFICATION_TYPE,
  insert: NOTIFICATION_INSERTION = "top",
  container: NOTIFICATION_CONTAINER = "top-center",
) => {
  Store.addNotification({
    title: title,
    message: message.toString(),
    type: type,
    insert: insert,
    container: container,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
    },
  });
};
