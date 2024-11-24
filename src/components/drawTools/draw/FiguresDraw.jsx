import { Layer, Stage } from "react-konva";
import { ArrowComponent } from "../figures/arrow/ArrowComponent";
import { CircleComponent } from "../figures/circle/CircleComponent";
import { RectComponent } from "../figures/rectangle/RectComponent";
import { TextComponent } from "../figures/text/TextComponent";
import { Circle } from "react-konva";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const FiguresDraw = ({
  handleInitPints,
  handleChangePoints,
  handleStopMove,
  selected,
  arrows,
  circles,
  rect,
  line,
  text,
  color,
  pointsInit,
  pointsEnd,
  pointsConcat,
  selectArrows,
  selectCircles,
  selectRect,
  selectLine,
  selectText,
  textValue,
  setSelected,
  setChangeText,
  setId,
  stageRef,
}) => {
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const boxRef = useRef();

  // Actualizar el tamaño del Stage cuando cambia el tamaño del contenedor
  useEffect(() => {
    const handleResize = () => {
      const box = boxRef.current;
      if (box) {
        setStageWidth(box.offsetWidth); // Obtener el ancho del Box
        setStageHeight(box.offsetHeight); // Obtener la altura del Box
      }
    };

    handleResize(); // Establecer el tamaño al cargar
    window.addEventListener("resize", handleResize); // Escuchar el redimensionamiento

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: { md: "90%", lg: "190%" }, // corregir para que no desplace objetos
        height: { md: "67vh", lg: "67vh" },
        overflow: "hidden",
        marginTop: 5,
        marginLeft: { md: 2, lg:-51 },
      }}
    >
      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleInitPints}
        onMouseMove={handleChangePoints}
        onMouseUp={handleStopMove}
        style={{
          position: "absolute",
          zIndex: 2, // zIndex más alto para que esté encima del gráfico
        }}
      >
        <Layer>
          {/* ///       Arrows      ///*/}
          {/* Draw first arrow without the state */}
          {selectArrows && pointsInit.length > 0 && pointsEnd.length > 0 && (
            <ArrowComponent
              points={pointsConcat}
              pointerLength={10}
              pointerWidth={10}
              stroke={color}
              strokeWidth={4}
            />
          )}
          {/* Saved arrows */}
          {arrows.map((arrow) => (
            <ArrowComponent
              key={arrow.id}
              id={arrow.id}
              points={arrow.position}
              pointerLength={10}
              pointerWidth={10}
              setSelected={setSelected}
              selected={selected}
              stroke={arrow.color}
              strokeWidth={4}
              setId={setId}
            />
          ))}

          {/* ///       Circles      ///*/}
          {/* Draw first Cicle without the state */}
          {selectCircles && pointsInit.length > 0 && pointsEnd.length > 0 && (
            <Circle
              fill={color}
              x={pointsInit[0]}
              y={pointsInit[1]}
              stroke="black"
              strokeWidth={4}
            />
          )}
          {/* Saved Circles */}
          {circles.map((circle, i) => (
            <CircleComponent
              key={i}
              id={circle.id}
              fill={circle.color}
              x={circle.position[0]}
              y={circle.position[1]}
              setSelected={setSelected}
              selected={selected}
              stroke="black"
              setId={setId}
            />
          ))}

          {/* ///       Rect      ///*/}
          {/* Draw first Rect without the state */}
          {selectRect && pointsInit.length > 0 && pointsEnd.length > 0 && (
            <RectComponent
              fill={color}
              stroke="black"
              strokeWidth={4}
              x={pointsInit[0]}
              y={pointsInit[1]}
            />
          )}
          {/* Saved Rect */}
          {rect.map((rect) => (
            <RectComponent
              key={rect.id}
              id={rect.id}
              width={50}
              height={50}
              fill={rect.color}
              setSelected={setSelected}
              selected={selected}
              stroke="black"
              x={rect.position[0]}
              y={rect.position[1]}
              setId={setId}
            />
          ))}

          {/* ///       line      ///*/}
          {/* Draw first arrow without the state */}
          {selectLine && pointsInit.length > 0 && pointsEnd.length > 0 && (
            <ArrowComponent
              points={pointsConcat}
              pointerLength={0}
              pointerWidth={0}
              stroke={color}
              strokeWidth={4}
            />
          )}
          {/* Saved Line */}
          {line.map((arrow) => (
            <ArrowComponent
              key={arrow.id}
              id={arrow.id}
              points={arrow.position}
              pointerLength={0}
              pointerWidth={0}
              setSelected={setSelected}
              selected={selected}
              stroke={arrow.color}
              strokeWidth={4}
              setId={setId}
            />
          ))}

          {/* ///       Text      ///*/}
          {/* Draw first arrow without the state */}

          {selectText && pointsInit.length > 0 && pointsEnd.length > 0 && (
            <TextComponent
              align="center"
              width={300}
              fill={color}
              text={textValue}
              x={pointsInit[0]}
              y={pointsInit[1]}
            />
          )}
          {/* Saved text */}
          {text.map((text) => (
            <TextComponent
              key={text.id}
              id={text.id}
              align="center"
              width={300}
              fill={text.color}
              text={text.text}
              setSelected={setSelected}
              selected={selected}
              x={text.position[0]}
              y={text.position[1]}
              setId={setId}
              setChangeText={setChangeText}
            />
          ))}
        </Layer>
      </Stage>
    </Box>
  );
};
