import { Store } from "react-notifications-component"

export const triggerWIPNotification = (message: string = "This feature is a work in progress!") => {
  Store.addNotification({
    title: "Work in Progress!",
    message: message.toString(),
    type: "info",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000
    }
  })
}
