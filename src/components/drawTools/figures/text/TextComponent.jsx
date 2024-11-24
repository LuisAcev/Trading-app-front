import { useEffect, useRef, useState } from "react";
import { Text, Transformer } from "react-konva";

export const TextComponent = ({
  align,
  fill,
  id,
  text,
  selected,
  setSelected,
  setId,
  setChangeText,
  x,
  y,
  width,
}) => {
  const textRef = useRef();
  const transformerRef = useRef();
  const [select, setSelect] = useState(false);

  const handleSelected = () => {
    if (selected) {
      setSelect(true);
      setId(id);
      setChangeText(true);
    } else {
      setSelect(false);
    }
  };

  const handDesleSelect = () => {
    setSelect(false);
    setSelected(true);
    setChangeText(false);
  };

  useEffect(() => {
    if (select) {
      // we need to attach transformer manually
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [select]);

  return (
    <>
      <Text
        align={align}
        draggable={true}
        fill={fill}
        fontSize={28}
        fontFamily="Calibri"
        onDblClick={handleSelected}
        onClick={handDesleSelect}
        id={id}
        width={width}
        text={text}
        ref={textRef}
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
