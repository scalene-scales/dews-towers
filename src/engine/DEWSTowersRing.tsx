import { useDrag } from "react-dnd";
import { DraggableRingData, DraggableTypes } from "./constants";

export default function DEWSTowersRing(props: {
  isDraggable: boolean;
  ringSize: number;
  ringCount: number;
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableTypes.RING,
      item: { ringSize: props.ringSize } as DraggableRingData,
      canDrag: props.isDraggable,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [props.isDraggable]
  );
  return (
    <div
      ref={drag}
      style={{
        display: isDragging ? "none" : undefined,
        backgroundColor: props.isDraggable ? "blue" : undefined,
      }}>
      {props.ringSize}
    </div>
  );
}
