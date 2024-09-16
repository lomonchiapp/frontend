import React from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { useSearchState } from '../../context/useSearchState'
import { X } from '@phosphor-icons/react'

export const SearchInput = ({handleFocus, handleBlur}) => {
  const {searchText, setSearchText} = useSearchState()    

  return (
    <TextField
    fullWidth
      autoComplete="off"
      variant="outlined"
      onChange={(e) => setSearchText(e.target.value)}
      onFocus={handleFocus}
      value={searchText}
      onBlur={handleBlur}
      sx={styles.searchInput}
      id="outlined-basic"
      label="Busca un Modelo / Marca"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {searchText && (
              <Box
                onClick={() => setSearchText("")}
                sx={styles.resetButton}
                component="button"
              >
                <X color="#EEFF71" size={12} />
                <Typography sx={styles.resetBtnText}>Resetear</Typography>
              </Box>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
const styles ={
    searchInput: {
        width: "100%",
      }
}