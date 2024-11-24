import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiguresDraw } from "./draw/FiguresDraw";
import { ToggleButtonFigures } from "../toggleButton/ToggleButtonFigures";
import { Box } from "@mui/material";

export const SelectFigure = () => {
  const stageRef = useRef(null);
  const [color, setColor] = useState("#D0021B");
  const [pointsInit, setPointsInit] = useState([]);
  const [pointsEnd, setPointsEnd] = useState([]);
  const [move, setMove] = useState(false);
  const [selected, setSelected] = useState(false);
  const [arrows, setArrows] = useState([]); // data base
  const [selectArrows, setSelectArrows] = useState(false);
  const [circles, setCircles] = useState([]); // data base
  const [selectCircles, setSeleCircles] = useState(false);
  const [rect, setRect] = useState([]); // data base
  const [selectRect, setSelectRect] = useState(false);
  const [line, setLine] = useState([]); // data base
  const [selectLine, setSelectLine] = useState(false);
  const [text, setText] = useState([]); // data base
  const [selectText, setSelectText] = useState(false);
  const [textValue, setTextValue] = useState("Text");
  const [changeText, setChangeText] = useState(false);

  // TODO borrar este state y utulizar redux
  const [id, setId] = useState(); // Id temporal

  const pointsConcat = pointsInit.concat(pointsEnd);

  //Controller Arrow Inital position
  const handleInitPints = (e) => {
    if (move === true && stageRef.current) {
      const posInit = stageRef.current.getPointerPosition();
      setPointsInit([posInit.x, posInit.y]);
    }
  };
  //Controller Arrow change and End position, move need to be true
  const handleChangePoints = (e) => {
    // eslint-disable-next-line
    if (pointsInit.length > 0 && move === true) {
      const posEnd = stageRef.current.getPointerPosition();
      setPointsEnd([posEnd.x, posEnd.y]);
    }
  };

  //Controller Stop move condition to move === true
  const handleStopMove = () => {
    setMove(false);
    setSelected(false);
    objectArray();
    setId();
    setChangeText(false);
    setTextValue("Text");
  };

  ///  Object Draw Controller   ///

  const handleFinishArrow = () => {
    setMove(true);
    setSelectArrows(true);
  };
  const handleFinishCircle = () => {
    setMove(true);
    setSeleCircles(true);
  };
  const handleFinishRect = () => {
    setMove(true);
    setSelectRect(true);
  };
  const handleFinishLine = () => {
    setMove(true);
    setSelectLine(true);
  };

  const handleFinishText = () => {
    setMove(true);
    setSelectText(true);
  };

  const handleChangeText = (e) => {
    const textchnage = e.target.value;
    setTextValue(textchnage);
    setText((prevText) =>
      prevText.map((TextPrev) =>
        TextPrev.id === id ? { ...TextPrev, text: textchnage } : { ...TextPrev }
      )
    );
  };

  const handleDelete = () => {
    setArrows((prevArrows) => prevArrows.filter((item) => item.id !== id));
    setCircles((prevCircle) => prevCircle.filter((item) => item.id !== id));
    setRect((prevRect) => prevRect.filter((item) => item.id !== id));
    setLine((prevLine) => prevLine.filter((item) => item.id !== id));
    setText((prevText) => prevText.filter((item) => item.id !== id));
    setId("");
  };

  // Actualizar colores objetos

  const handleUploadColor = (color) => {
    setArrows((prevArrow) =>
      prevArrow.map((prevArrows) =>
        prevArrows.id === id
          ? { ...prevArrows, color: color }
          : { ...prevArrows }
      )
    );
    setCircles((prevCircle) =>
      prevCircle.map((item) =>
        item.id === id ? { ...item, color: color } : { ...item }
      )
    );
    setRect((prevArrow) =>
      prevArrow.map((item) =>
        item.id === id ? { ...item, color: color } : { ...item }
      )
    );
    setLine((prevArrow) =>
      prevArrow.map((item) =>
        item.id === id ? { ...item, color: color } : { ...item }
      )
    );

    setText((prevArrow) =>
      prevArrow.map((item) =>
        item.id === id ? { ...item, color: color } : { ...item }
      )
    );
  };

  // Object Array

  const objectArray = () => {
    if (selectArrows && pointsInit.length > 0 && pointsEnd.length > 0) {
      setArrows((prevArrows) => [
        ...prevArrows,
        { id: uuidv4(), position: pointsConcat, color: color },
      ]);
      setPointsInit([]); // Limpiar puntos
      setPointsEnd([]);
      setSelectArrows(false);
      return;
    }

    if (selectCircles && pointsInit.length > 0 && pointsEnd.length > 0) {
      setCircles((prevCircles) => [
        ...prevCircles,
        { id: uuidv4(), position: pointsInit, color: color },
      ]);
      setPointsInit([]); // Limpiar puntos
      setPointsEnd([]);
      setSeleCircles(false);
      return;
    }

    if (selectRect && pointsInit.length > 0 && pointsEnd.length > 0) {
      setRect((prevRect) => [
        ...prevRect,
        { id: uuidv4(), position: pointsInit, color: color },
      ]);
      setPointsInit([]); // Limpiar puntos
      setPointsEnd([]);
      setSelectRect(false);
      return;
    }

    if (selectLine && pointsInit.length > 0 && pointsEnd.length > 0) {
      setLine((prevLine) => [
        ...prevLine,
        { id: uuidv4(), position: pointsConcat, color: color },
      ]);
      setPointsInit([]); // Limpiar puntos
      setPointsEnd([]);
      setSelectLine(false);
      return;
    }

    if (selectText && pointsInit.length > 0 && pointsEnd.length > 0) {
      setText((prevText) => [
        ...prevText,
        { id: uuidv4(), position: pointsInit, text: textValue, color: color },
      ]);
      setPointsInit([]); // Limpiar puntos
      setPointsEnd([]);
      setSelectText(false);
      return;
    }
  };

  return (
    <Box >
      <ToggleButtonFigures
        handleFinishArrow={handleFinishArrow}
        handleFinishCircle={handleFinishCircle}
        handleFinishRect={handleFinishRect}
        handleFinishLine={handleFinishLine}
        handleFinishText={handleFinishText}
        handleDelete={handleDelete}
        setColor={setColor}
        handleUploadColor={handleUploadColor}
        handleChangeText ={handleChangeText}
        changeText ={changeText}
        color={color}
        textValue ={textValue}
      />
      <FiguresDraw
        handleInitPints={handleInitPints}
        handleChangePoints={handleChangePoints}
        handleStopMove={handleStopMove}
        selected={selected}
        arrows={arrows}
        circles={circles}
        rect={rect}
        line={line}
        text={text}
        color={color}
        pointsInit={pointsInit}
        pointsEnd={pointsEnd}
        move={move}
        selectArrows={selectArrows}
        selectCircles={selectCircles}
        selectRect={selectRect}
        selectLine={selectLine}
        selectText={selectText}
        textValue={textValue}
        changeText={changeText}
        id={id}
        pointsConcat={pointsConcat}
        setSelected={setSelected}
        setChangeText={setChangeText}
        setId={setId}
        stageRef={stageRef}
      />
    </Box>
  );
};
