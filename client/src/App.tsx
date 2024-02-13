import React, { useState } from 'react';
import GitHubFileViewer from './GitHubFileViewer';

function App() {
  const [showEvent, setShowEvent] = useState(false);
  return (
    <div>
      
      <h1>Display GitHub File <button onClick={() => setShowEvent(showEvent => !showEvent)}></button></h1>
      {showEvent && (<GitHubFileViewer owner="ArashAmiry" repo="Smasko" path="client/src/App.tsx" />)}
      {!showEvent && (<GitHubFileViewer owner="dinohromic" repo="PayMe2.0" path="app/src/main/java/com/example/payme20/model/Member.java" />)}
      
    </div>
  );
}

export default App;