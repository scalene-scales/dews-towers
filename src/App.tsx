import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import DEWSTowersControlPanel from "./control_panel/DEWSTowersControlPanel";
import DEWSTowersBoard, { BoardState } from "./engine/DEWSTowersBoard";

function createBoardState(ringCount: number): BoardState {
  return [
    Array<number>(ringCount)
      .fill(0)
      .map((_, index) => ringCount - index - 1),
    [],
    [],
  ];
}

function App() {
  const [ringCount, setRingCount] = useState<number>(3);
  const [turnNumber, setTurnNumber] = useState<number>(0);
  const [boardState, setBoardState] = useState<BoardState>(
    createBoardState(ringCount)
  );
  useEffect(() => {
    setBoardState(createBoardState(ringCount));
    setTurnNumber(0);
  }, [ringCount]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DEWS - Towers</h1>
        <DEWSTowersControlPanel
          ringCount={ringCount}
          onChangeRingCount={setRingCount}
        />
        <DEWSTowersBoard
          boardState={boardState}
          ringCount={ringCount}
          turnNumber={turnNumber}
          onMove={(ring, toPole) => {
            const fromPole = boardState
              .map((pole) => pole.indexOf(ring) != -1)
              .indexOf(true);

            boardState[fromPole] = boardState[fromPole].slice(0, -1);
            boardState[toPole].push(ring);

            setBoardState(boardState);
            setTurnNumber(turnNumber + 1);
          }}
        />
        <div>
          {boardState.at(-1)?.length == ringCount
            ? "Victory!!!"
            : "In Progress"}
        </div>
      </header>
    </div>
  );
}

export default App;
