import { useEffect, useRef, useState } from "react";
import { Circle, Transformer } from "react-konva";

export const CircleComponent = ({
  fill,
  id,
  selected,
  setSelected,
  setId,
  stroke,
  x,
  y,
}) => {
  const circleRef = useRef();
  const transformerRef = useRef();
  const [select, setSelect] = useState(false);

  const handleSelected = () => {
    if (selected) {
      setSelect(true);
      setId(id);
    } else {
      setSelect(false);
    }
  };

  const handDesleSelect = () => {
    setSelect(false);
    setSelected(true);
  };

  useEffect(() => {
    if (select) {
      // we need to attach transformer manually
      transformerRef.current.nodes([circleRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [select]);
  return (
    <>
      <Circle
        draggable
        fill={fill}
        id={id}
        onDblClick={handleSelected}
        onClick={handDesleSelect}
        opacity={0.65}
        radius={20}
        ref={circleRef}
        stroke={stroke}
        strokeWidth={4}
        strokeScaleEnabled={false}
        x={x}
        y={y}
        // Establece el cursor cuando el mouse está sobre el rectángulo
        onMouseEnter={(e) => {
          const stage = e.target.getStage();
          stage.container().style.cursor = "pointer";
        }}
        onMouseLeave={(e) => {
          const stage = e.target.getStage();
          stage.container().style.cursor = "default";
        }}
      />
      {select && selected && <Transformer ref={transformerRef} />}
    </>
  );
};
