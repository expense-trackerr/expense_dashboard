import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { createContext, useCallback, useMemo, useState } from 'react';

type SnackbarContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSuccess: () => {},
  showError: () => {},
});

type SnackbarTypeState = {
  open: boolean;
  message: string;
  type: AlertColor;
};

export function SnackbarContextProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarTypeState>({ open: false, message: '', type: 'success' });

  const showSuccess = useCallback((message: string) => {
    setSnackbar({ open: true, message, type: 'success' });
  }, []);

  const showError = useCallback((message: string) => {
    setSnackbar({ open: true, message, type: 'error' });
  }, []);

  const handleClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const snackbarValue = useMemo(
    () => ({
      showSuccess,
      showError,
    }),
    [showSuccess, showError]
  );

  return (
    <SnackbarContext.Provider value={snackbarValue}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
