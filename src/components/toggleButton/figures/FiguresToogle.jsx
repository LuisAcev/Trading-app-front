import ToggleButton from "@mui/material/ToggleButton";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Crop54Icon from "@mui/icons-material/Crop54";
import TitleIcon from "@mui/icons-material/Title";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Menu, ToggleButtonGroup } from "@mui/material";
import { SketchPicker } from "react-color";
import TextField from "@mui/material/TextField";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useTranslation } from "react-i18next";

export const FiguresToogle = ({
  handleFinishArrow,
  handleFinishCircle,
  handleFinishRect,
  handleFinishLine,
  handleFinishText,
  handleDelete,
  handleUploadColor,
  handleChangeText,
  handleAlignment,
  handleClick,
  handleClose,
  anchorEl,
  changeText,
  color,
  formats,
  open,
  setColor,
  textValue,
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: { xs: "none", md: "contents", lg: "contents" } }}>
      <ToggleButtonGroup
        size="small"
        value={formats}
        exclusive
        onChange={handleAlignment}
        aria-label="text formatting"
       >
        <ToggleButton
          value="arrow"
          aria-label="arrow"
          title={t("draw.arrow")}
          onClick={handleFinishArrow}
          sx={{ borderRadius: "1rem"}}
        >
          <TransitEnterexitIcon />
        </ToggleButton>
        <ToggleButton
          value="line"
          aria-label="line"
          title={t("draw.line")}
          onClick={handleFinishLine}
        >
          <LineAxisIcon />
        </ToggleButton>
        <ToggleButton
          value="circles"
          aria-label="circles"
          title={t("draw.circle")}
          onClick={handleFinishCircle}
        >
          <RadioButtonUncheckedIcon />
        </ToggleButton>
        <ToggleButton
          value="bold"
          aria-label="bold"
          title={t("draw.rectangle")}
          onClick={handleFinishRect}
        >
          <Crop54Icon />
        </ToggleButton>
        <ToggleButton
          value="bold"
          aria-label="bold"
          title={t("draw.text")}
          onClick={handleFinishText}
        >
          <TitleIcon />
        </ToggleButton>
        <ToggleButton
          value="bold"
          aria-label="bold"
          title={t("draw.color")}
          onDoubleClick={handleClick}
          onClick={handleClose}
        >
          <ColorLensIcon />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onKeyDown={handleUploadColor}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <SketchPicker
              color={color}
              onChangeComplete={(selectedColor) => {
                setColor(selectedColor.hex);
                handleUploadColor(selectedColor.hex);
              }}
            />
          </Menu>
        </ToggleButton>
        <ToggleButton
          value="bold"
          aria-label="bold"
          title={t("draw.delete")}
          onClick={handleDelete}
          sx={{ borderRadius: "1rem" }}
        >
          <DeleteOutlineIcon />
        </ToggleButton>
        {changeText && (
          <TextField
            label={textValue}
            variant="outlined"
            sx={{ marginTop: "0.3rem", margin: "0, 0, 0, 0" }}
            onChange={handleChangeText}
          />
        )}
      </ToggleButtonGroup>
    </Box>
  );
};
