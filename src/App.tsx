import { useEffect } from "react";

import { sessionState, useChatSession } from "@chainlit/react-client";
import { Playground } from "./components/playground";
import { useRecoilValue } from "recoil";

const userEnv = {};

function App() {
  const { connect } = useChatSession();
  const session = useRecoilValue(sessionState);
  useEffect(() => {
    if (session?.socket.connected) {
      return;
    }
    connect({
      userEnv
    })
  }, [connect]);

  return (
    <>
      <div className="">
        <Playground />
      </div>
    </>
  );
}

export default App;
