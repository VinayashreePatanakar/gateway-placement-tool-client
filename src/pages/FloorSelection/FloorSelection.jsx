// src/pages/FloorSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // assuming you use react-router

export default function FloorSelection() {
  const navigate = useNavigate();
  const [floors, setFloors] = useState(["Ground Floor"]);

  const addFloor = () => {
    const newFloorNumber = floors.length; // 1, 2, 3...
    const newFloorName =
      newFloorNumber === 1
        ? "1st Floor"
        : newFloorNumber === 2
        ? "2nd Floor"
        : `${newFloorNumber}th Floor`;
    setFloors([...floors, newFloorName]);
  };

  const reduceFloor = () => {
    if (floors.length > 1) {
      setFloors(floors.slice(0, -1));
    }
  };

  const handleFloorClick = (floor) => {
    // Navigate to Gateway Placement page
    // You can pass floor info via state or query param
    navigate("/gateway-placement", { state: { floor } });
  };

  return (
    <div className="p-4 flex flex-col items-center gap-6">
      <h2 className="text-xl font-semibold">Select Floor</h2>

      <div className="flex gap-4">
        <button onClick={addFloor} className="btn btn-success">
          Add Floor
        </button>
        <button onClick={reduceFloor} className="btn btn-error">
          Reduce Floor
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => handleFloorClick(floor)}
            className="btn w-full btn-outline btn-primary"
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
}
