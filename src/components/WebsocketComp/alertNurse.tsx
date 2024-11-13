import React, { useEffect } from "react";
import { subscribeToChannel } from "../../services/PusherService";

const AlertNurse = () => {
  useEffect(() => {
    // Define callback function to handle incoming data
    const handleEvent = (data) => {
      console.log("Event received:", data);
      alert(`Message from backend: ${data.message}`);
    };

    console.log("Subscribing to my-event on my-channel...");
    const unsubscribe = subscribeToChannel(
      "my-channel",
      "my-event",
      handleEvent
    );

    // Clean up by unsubscribing when component unmounts
    return () => {
      console.log("Unsubscribing from my-event...");
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Pusher Test in React</h1>
    </div>
  );
};

export default AlertNurse;
