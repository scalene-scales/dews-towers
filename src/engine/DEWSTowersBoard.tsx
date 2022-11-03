import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DEWSTowersPole, { PoleState } from "./DEWSTowersPole";

export type BoardState = [PoleState, PoleState, PoleState];

export default function DEWSTowersBoard(props: {
  boardState: BoardState;
  ringCount: number;
  turnNumber: number;
  onMove: (ring: number, toPole: number) => void;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex justify-content-around container-fluid">
        {props.boardState.map((pole, index) => {
          return (
            <DEWSTowersPole
              key={index}
              pole={pole}
              ringCount={props.ringCount}
              onMoveRingHere={(ring: number) => {
                props.onMove(ring, index);
              }}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}
