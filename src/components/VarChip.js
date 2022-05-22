import React from 'react';
import PropTypes from 'prop-types';
import {Box, useTheme} from "@mui/material";
import {css} from "@emotion/react";

const VarChip = props => {
    const theme = useTheme();
    const styles = {
        varChipContainer: css`
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-self: center;
          height: 2em;
          border: 1px solid ${theme.palette.primary.main};
          box-sizing: border-box;
          border-radius: 1em;
          font-size: 13px;
          margin: 0.5em;
          overflow: hidden;
        `,
        varChipName: css`
          height: calc(100% + 2px);
          margin-left: -1px;
          border: 1px solid ${theme.palette.primary.main};
          color: ${theme.palette.primary.light};
          min-width: 2em;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          //border-radius: 1em;
          flex-shrink: 0;
          padding-right: 0.5em;
          padding-left: 1em;
        `,
        varChipValue: css`
          height: 100%;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.5em;
          margin-right: 1em;
          white-space: nowrap;
        `
    };
    return (
        <Box sx={styles.varChipContainer}>
            <Box sx={styles.varChipName}>{props.name}</Box>
            <Box sx={styles.varChipValue}>{props.value}</Box>
        </Box>
    );
};

VarChip.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string
};

export default VarChip;