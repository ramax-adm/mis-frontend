"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";

// Contexto
interface PopoverContextType {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  handleOpen: (el: HTMLButtonElement) => void;
  handleClose: () => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

// Root
export const PopoverRoot: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleOpen = (el: HTMLButtonElement) => setAnchorEl(el);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <PopoverContext.Provider
      value={{ anchorEl, open, handleOpen, handleClose }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

// Trigger
export const PopoverTrigger: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const { handleOpen } = usePopoverContext();

  return (
    <Button
      variant='contained'
      onClick={(e) => handleOpen(e.currentTarget)}
      {...props}
    >
      {children}
    </Button>
  );
};

// Content
export const PopoverContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { open, anchorEl, handleClose } = usePopoverContext();
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {children}
    </Popover>
  );
};

export const PopoverTypography: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography
      {...props}
      sx={{
        paddingY: 1.5,
        paddingX: 2,
        "&:hover": {
          backgroundColor: "rgba(62, 99, 221, 0.1)",
          cursor: "pointer",
        },
      }}
    >
      {children}
    </Typography>
  );
};

export function usePopoverContext() {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error(
      "usePopoverContext must be used with PopoverContextProvider"
    );
  }
  return context;
}
