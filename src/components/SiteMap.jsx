import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Circle, Rect, Text, Group } from "react-konva";
import { useMapStore } from "../store/mapStore";

export default function SiteMap() {
  const { elements, updateElementPosition, image, setImage } = useMapStore();

  const stageRef = useRef();
  const containerRef = useRef();

  const [scale, setScale] = useState(1);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  // Adjust stage size dynamically based on parent container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setStageSize({ width: clientWidth, height: clientHeight });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => setImage(img);
    };
    reader.readAsDataURL(file);
  };

  {/* const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = uri;
    a.download = "map.png";
    a.click();
  };*/}

  // 🖱️ Handle panning
  const handleMouseDown = (e) => {
    // only start panning if zoomed in
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.evt.clientX - stagePos.x,
      y: e.evt.clientY - stagePos.y,
    });
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.evt.clientX - dragStart.x;
    const newY = e.evt.clientY - dragStart.y;
    setStagePos({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
  };

  // 🧭 Handle scroll wheel zoom
const handleWheel = (e) => {
  e.evt.preventDefault();

  const scaleBy = 1.05; // zoom speed
  const stage = stageRef.current;
  const oldScale = stage.scaleX();

  // Calculate new scale
  const pointer = stage.getPointerPosition();
  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
  setScale(newScale);

  // Re-center to keep zoom focused on pointer
  const newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  setStagePos(newPos);
};

  return (
    <div className="flex flex-col items-center gap-3 w-full h-full">
      {/* Upload + Scale controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-3 mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="file-input file-input-bordered file-input-sm w-full sm:w-auto"
        />
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="range range-success w-full sm:w-40"
        />
      </div>

      {/* Map Canvas */}
      <div
        ref={containerRef}
        className="border-1 border-gray-400 rounded-lg bg-gray-100 w-[115vh] md:w-[125vh] h-[70vh] md:h-[40vh] overflow-hidden flex items-center justify-center"
      >
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          scaleX={scale}
          scaleY={scale}
          ref={stageRef}
          x={stagePos.x}
          y={stagePos.y}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}  
        >
          <Layer>
            {/* Background image */}
            {image && <KonvaImage image={image} width={stageSize.width} height={stageSize.height} />}

            {/* Elements */}
           {elements.map((el) => (
  <Group
    key={el.id}
    draggable
    x={el.x}
    y={el.y}
    onDragEnd={(e) => updateElementPosition(el.id, e.target.x(), e.target.y())}
  >
    {el.type === "sensor" ? (
      <>
        <Rect
          x={-((el.width ?? 30) / 2) * scale}
          y={-((el.height ?? 30) / 2) * scale}
          width={(el.width ?? 30) * scale}
          height={(el.height ?? 30) * scale}
          fill={el.color}
          cornerRadius={5 * scale}
        />
        <Text
          text={el.label}
          fontSize={14 * scale}
          fontStyle="bold"
          fill="white"
          width={(el.width ?? 30) * scale}
          height={(el.height ?? 30) * scale}
          align="center"
          verticalAlign="middle"
          offsetX={(el.width ?? 30) * scale / 2}
          offsetY={(el.height ?? 30) * scale / 2}
        />
      </>
    ) : (
      <>
        <Circle radius={el.radius * scale} fill={el.color} />
        <Circle radius={17} fill="white" />
        <Text
          text={el.label}
          fontSize={14 * scale}
          fontStyle="bold"
          fill="black"
          offsetY={7 * scale * -1}
          align="center"
          verticalAlign="middle"
          width={el.radius * scale * 2}
          height={el.radius * scale * 2}
          offsetX={el.radius * scale}
          offsetY={el.radius * scale}
        />
      </>
    )}
  </Group>
))}


          </Layer>
        </Stage>
      </div>

      {/* Export */}
      {/*<div className="flex gap-3 mt-3">
        <button onClick={handleExport} className="btn btn-outline btn-sm">
          Export PNG
        </button>
      </div>*/}
    </div>
  );
}
