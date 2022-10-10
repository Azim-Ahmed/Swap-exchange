import React, { useCallback, useEffect, useState } from "react";
import SockJsClient from "react-stomp";
import { useSelector } from "react-redux";
import { BACKEND_WEBSOCKET_URL } from "../../urlConfig";
import { stringify, parse } from "zipson";

const Websocket = (props) => {
  const user = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(true);
  const [refData, setRefData] = useState(null);
  const { id, projectId } = user?.user;
  const { elements, setPendingRequest, pendingRequest, initialElements } =
    props;
  const newSendMessage = useCallback(() => {
    if (pendingRequest) {
      const firstCompressed = stringify(elements);

      try {
        refData.sendMessage(
          "/app/organization",
          JSON.stringify({
            id: initialElements.id,
            userId: id,
            projectId,
            messageContent: firstCompressed,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [pendingRequest]);

  useEffect(() => {
    newSendMessage();
    setPendingRequest(false);
    // return () => setPendingRequest(false);
  }, [pendingRequest, setPendingRequest, newSendMessage]);

  const handleMessage = (msg) => {
    const parsed = parse(msg.messageContent);
    props.setElements(parsed);
  };

  return (
    <div>
      <SockJsClient
        url={BACKEND_WEBSOCKET_URL + "/push-message-mapping/"}
        topics={["/topic/content/" + projectId]}
        onConnect={() => {
          setVisible(false);
        }}
        onDisconnect={() => {
          setVisible(false);
        }}
        onMessage={(msg) => {
          handleMessage(msg);
        }}
        // debug={true}
        ref={(client) => {
          setRefData(client);
        }}
        // onConnectFailure={(error) => console.log(error)}
        autoReconnect={true}
      />
    </div>
  );
};

export default Websocket;
