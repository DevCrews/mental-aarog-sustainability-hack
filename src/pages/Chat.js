import Navbar from "../components/Navbar";

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="container-w-flex">
        <iframe
          title="chatbot"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/db73a415-faa0-4825-b97a-dc9ee165f98f"
        ></iframe>
      </div>
    </>
  );
};

export default Chat;
