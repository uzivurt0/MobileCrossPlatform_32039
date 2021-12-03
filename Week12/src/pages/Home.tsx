import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import { Toast } from "@capacitor/toast";
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
} from "@capacitor/push-notifications";

const Home: React.FC = () => {
  const nullEntry: any[] = [];
  const [notifications, setNotifications] = useState(nullEntry);

  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg,
    });
  };

  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
            showToast("Push Notifications permission denied");
          } else {
            showToast("Push Notifications permission granted");
            registerPush();
          }
        });
      } else {
        registerPush();
      }
    });
  }, []);

  const registerPush = () => {
    console.log("Initializing HomePage");

    //Register with apple/google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (Token) => {
      showToast("Push registration success");
      console.log("Push Registration Success");
    });

    // some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {
      alert("Error on registration: " + JSON.stringify(error));
      console.log("Push Registration Error: ", JSON.stringify(error));
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotificationSchema) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: "foreground",
          },
        ]);
        console.log("notification", notification);
        console.log("notifications", notifications);
      }
    );

    //method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: ActionPerformed) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: "action",
          },
        ]);
        console.log("notification:", notification);
        console.log("notifications:", notifications);
      }
    );
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <p>1. Register for Push by clicking the footer button</p>
            <p>2. Once registered, you can send push from Firebase console </p>
            <p>
              3. Once your app receives notifications, you'll see the data here
              in the list{" "}
            </p>
          </IonCardContent>
        </IonCard>
        <IonListHeader>Notifications</IonListHeader>
        <IonList>
          {notifications.map((notif) => (
            <IonItem key={notif.id}>
              <IonLabel>
                <IonText>
                  <h3>{notif.title}</h3>
                </IonText>
                <p>{notif.body}</p>
                {notif.type === "foreground" && (
                  <p>This data was received in foreground</p>
                )}
                {notif.type === "action" && (
                  <p>This data was received on tap</p>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton color="success" expand="full" onClick={registerPush}>
            Register for Push
          </IonButton>
          <IonButton color="success" expand="full" routerLink={"/login"}>
            Go To Login
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
