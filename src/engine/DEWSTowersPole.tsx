import { useEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { DraggableRingData, DraggableTypes } from "./constants";
import DEWSTowersRing from "./DEWSTowersRing";

export type PoleState = Array<number>;

function DEWSTowersSlot(props: {
  ring: number | null;
  ringCount: number;
  isDraggable: boolean;
  isDropping?: boolean | null;
}) {
  return (
    <div
      style={{
        height: 50,
        marginBottom: 5,
        backgroundColor:
          props.isDropping == null
            ? undefined
            : props.isDropping
            ? "green"
            : "red",
      }}>
      {props.ring != null && (
        <DEWSTowersRing
          isDraggable={props.isDraggable}
          ringSize={props.ring}
          ringCount={props.ringCount}
        />
      )}
    </div>
  );
}

function canMoveToPole(ring: number, pole: PoleState): boolean {
  const lastRingOnPole = pole.at(-1);
  if (lastRingOnPole != null) {
    return lastRingOnPole > ring;
  }
  return true;
}

export default function DEWSTowersPole(props: {
  pole: PoleState;
  ringCount: number;
  onMoveRingHere: (ring: number) => void;
}) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DraggableTypes.RING,
      drop: (item: DraggableRingData) => props.onMoveRingHere(item.ringSize),
      canDrop: (item: DraggableRingData) =>
        canMoveToPole(item.ringSize, props.pole),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props.pole, props.onMoveRingHere]
  );

  const slots = Array(props.ringCount).fill(null);
  props.pole.forEach((ringSize, index) => {
    slots[slots.length - index - 1] = ringSize;
  });

  return (
    <div
      ref={drop}
      className="p-2">
      {slots.map((slot, index) => {
        return (
          <DEWSTowersSlot
            key={index}
            ring={slot}
            isDraggable={slots.length - props.pole.length == index}
            ringCount={props.ringCount}
            isDropping={isOver ? canDrop : undefined}
          />
        );
      })}
      <div
        style={{
          width: 200,
          height: 50,
          backgroundColor: "red",
        }}></div>
    </div>
  );
}
