import Pusher from "pusher-js";

// Initialize Pusher instance with necessary config
const pusher = new Pusher("ec3782c390a642594669", {
  cluster: "eu",
  forceTLS: true,
});

// Function to subscribe to a channel and event
export const subscribeToChannel = (channelName, eventName, callback) => {
  const channel = pusher.subscribe(channelName);
  channel.bind(eventName, callback);

  // Return unsubscribe function to clean up
  return () => {
    channel.unbind(eventName, callback);
    pusher.unsubscribe(channelName);
  };
};
