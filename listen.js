// first need to export google credentials
//export GOOGLE_APPLICATION_CREDENTIALS="/Users/ali/Downloads/sturdy-magnet-236118-01a595e2661a.json"

const subscriptionName = 'projects/sturdy-magnet-236118/subscriptions/receive-email';
const timeout = 60000;

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub({projectId: "sturdy-magnet-236118"});

function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(message.data.toString());                     
    console.log('message attr: ', message.attributes);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages();