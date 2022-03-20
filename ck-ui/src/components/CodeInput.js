import React from 'react';
import PropTypes from 'prop-types';
import {Icon, IconButton, InputAdornment, TextField, useTheme} from "@mui/material";
import {css} from "@emotion/react";

const CodeInput = props => {
    const theme = useTheme();
    const styles = {
        codeInput: css`
          font-family: Source Code Pro, sans-serif;
        `
    };

    return (
        <TextField
            fullWidth multiline
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton>
                            <Icon>send</Icon>
                        </IconButton>
                    </InputAdornment>,
                sx: styles.codeInput
            }}
        />
    );
};

CodeInput.propTypes = {};

export default CodeInput;