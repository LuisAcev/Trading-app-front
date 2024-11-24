import { useEffect, useRef, useState } from "react";
import { Arrow, Transformer } from "react-konva";

export const ArrowComponent = ({
  id,
  selected,
  strokeWidth,
  setId,
  setSelected,
  stroke,
  pointerLength,
  pointerWidth,
  points,
}) => {
  const arrowRef = useRef();
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
      transformerRef.current.nodes([arrowRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [select]);

  return (
    <>
      <Arrow
        draggable
        onDblClick={handleSelected}
        onClick={handDesleSelect}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        points={points}
        id={id}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeScaleEnabled={false}
        ref={arrowRef}
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
