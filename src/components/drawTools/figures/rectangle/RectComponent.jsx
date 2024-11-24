import { useEffect, useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";

export const RectComponent = ({
  id,
  fill,
  height,
  width,
  selected,
  setSelected,
  setId,
  stroke,
  x,
  y,
}) => {
  const recteRef = useRef();
  const transformerRef = useRef();
  const [select, setSelect] = useState(false);

  const handLeSelected = () => {
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
      transformerRef.current.nodes([recteRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [select]);

  return (
    <>
      <Rect
        draggable={true}
        fill={fill}
        id={id}
        width={width}
        height={height}
        onClick={handDesleSelect}
        opacity={0.65}
        onDblClick={handLeSelected}
        stroke={stroke}
        strokeScaleEnabled={false}
        strokeWidth={4}
        ref={recteRef}
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
