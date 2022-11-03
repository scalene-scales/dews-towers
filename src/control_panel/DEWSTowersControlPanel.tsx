import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

const MIN_RING_COUNT = 3;
const MAX_RING_COUNT = 10;

export default function DEWSTowersControlPanel(props: {
  ringCount: number;
  onChangeRingCount: (ringCount: number) => void;
}) {
  const [rawRingCount, setRawRingCount] = useState<number>(props.ringCount);

  return (
    <>
      <div className="d-flex justify-content-around container-fluid">
        <div className="p-2">
          <div className="input-group mb-3">
            <span className="input-group-number">Number of Rings:</span>
            <input
              type="number"
              min={MIN_RING_COUNT}
              step={1}
              max={MAX_RING_COUNT}
              className="form-control"
              aria-label="The number of rings to generate."
              value={rawRingCount}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                if (Number.isInteger(newValue)) {
                  if (
                    newValue >= MIN_RING_COUNT &&
                    newValue <= MAX_RING_COUNT
                  ) {
                    setRawRingCount(newValue);
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="p-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              // Hack to force resetting when changing to the same ring count.
              props.onChangeRingCount(0);
              props.onChangeRingCount(rawRingCount);
            }}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
