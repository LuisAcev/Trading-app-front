import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { useTranslation } from 'react-i18next';

export function LanguageFlag({ data = [], sx, ...other }) {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(data[0].value);

  const [openPopover, setOpenPopover] = useState(null);

  const changeLenguage = (lang)=>{
    i18n.changeLanguage(lang);

  };

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeLang = useCallback(
    (newLang) => {
      setLocale(newLang);
      handleClosePopover();
    },
    [handleClosePopover]
  );

  const currentLang = data.find((lang) => lang.value === locale);

  const renderFlag = (label, icon) => (
    <Box
      component="img"
      alt={label}
      src={icon}
      sx={{ width: 26, height: 20, borderRadius: 0.5, objectFit: "cover" }}
    />
  );

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          width: 36,
          height: 36,
          ...(openPopover && { bgcolor: "action.selected" }),
          ...sx,
        }}
        {...other}
      >
        {renderFlag(currentLang?.label, currentLang?.icon)}
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 120,
            display: { xs: "flex", md: "flex", lg: "flex" },
            alignItems: { xs: "center", md: "center", lg: "center" },
            justifyContent: "center",
            maxWidth: { sm: "100%", md: "1700px" },
            pt: 1.5,
            flexDirection: "column",
            backgroundColor: "hsla(220, 30%, 5%, 0.7)",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          {data?.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang?.value}
              onClick={() =>{ 
                handleChangeLang(option.value)
                changeLenguage(option.value)
                }}
            >
              {renderFlag(option.label, option.icon)}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}