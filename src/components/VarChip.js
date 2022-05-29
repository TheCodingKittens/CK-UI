import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Tooltip,
    useTheme
} from "@mui/material";
import {css} from "@emotion/react";
import InspectorDialog from "./InspectorDialog";

const VarChip = props => {
    const theme = useTheme();
    const styles = {
        varChipContainer: css`
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-self: center;
          min-height: 2em;
          border: 1px solid ${theme.palette.primary.main};
          box-sizing: border-box;
          border-radius: 1em;
          font-size: 13px;
          margin: 0.5em;
          overflow: hidden;
        `,
        listChipContainer: css`
          cursor: pointer;
          box-shadow: none;
          transition: box-shadow 0.25s;

          &:hover {
            box-shadow: 0 0 5px 0px ${theme.palette.primary.main};
          }
        `,
        varChipName: css`
          height: 200%;
          margin-left: -1px;
            //border: 1px solid ${theme.palette.primary.main};
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
          position: relative;

          &:after {
            position: absolute;
            right: 0;
            height: 100vh;
            border-right: 1px solid ${theme.palette.primary.main};
            content: "";
          }
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
          flex-wrap: wrap;
        `,
        listEntryContainer: css`
          margin: 0.1em 0.2em;
          max-width: 10em;
          overflow: hidden;
          text-overflow: ellipsis;
        `,
        listEntrySeparator: css`
          color: ${theme.palette.primary.light};
          font-weight: bold;
          margin-right: 0.2em;
        `
    };
    const [dialogOpen, setDialogOpen] = useState(false);

    const getDictString = (dict) => {
        let dictLength = Object.keys(dict).length;
        if (dictLength === 1){
            return `<dict of 1 entry>`;
        }
        else if (dictLength === 0) {
            return `<empty dict>`
        }
        else {
            return `<dict of ${dictLength} entries>`;
        }
    }

    let content = props.value;
    if (props.type !== 'general') {
        if (props.type === 'list') {
            let elements = [];

            let i = 0;
            for (let entry of content.slice(0, 5)) {
                let text = entry;
                if (Array.isArray(entry)) {
                    text = `<list of ${entry.length}>`;
                }
                else if (typeof entry === 'object') {
                    text = `<dictionary>`;
                }
                elements.push(
                    <Box sx={styles.listEntryContainer} key={`var-${i++}`}>
                        {text}
                    </Box>
                );
                elements.push(
                    <Box sx={styles.listEntrySeparator} key={`sep-${i++}`}>,</Box>
                );
            }

            if (content.length > 5) {
                elements.push(
                    <Box sx={styles.listEntryContainer}>
                        ...
                    </Box>
                );
            } else {
                elements.splice(elements.length - 1, 1);
            }

            if (elements.length === 0) {
                elements.push(
                    <Box sx={styles.listEntryContainer} key={`var-${i++}`}>
                        {"<empty list>"}
                    </Box>
                );
            }

            content = elements;
        }
        // type is dict
        else {
            //content = JSON.stringify(props.value);
            content = getDictString(props.value);
        }

        const handleClick = event => {
            setDialogOpen(true);
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <>
                <Tooltip title="show full element">
                    <Box
                        sx={[styles.varChipContainer, styles.listChipContainer]}
                        onClick={e => handleClick(e)}
                    >
                        <Box sx={styles.varChipName}>{props.name}</Box>
                        <Box sx={styles.varChipValue}>{content}</Box>
                    </Box>
                </Tooltip>
                <InspectorDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    content={props.value}
                    name={props.name}
                />
            </>
        )
        // s u c c
    } else return (
        <Box sx={styles.varChipContainer}>
            <Box sx={styles.varChipName}>{props.name}</Box>
            <Box sx={styles.varChipValue}>{content}</Box>
        </Box>
    );
};

VarChip.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any
};

export default VarChip;