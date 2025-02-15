import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export function usePopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
  }, []);

  return {
    open: Boolean(open),
    anchorEl: open,
    onOpen,
    onClose,
  };
} 