import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Canvas} from "reaflow";
import {Box, useTheme} from "@mui/material";
import {css} from "@emotion/react";
import {generateFakeEdges, parseCommandsToNodes} from "../utils/node-utils";

const CodeDisplay = props => {
    const theme = useTheme();
    const styles = {
        displayContainer: css`
          max-width: 100%;
          max-height: 100%;
        `
    };
    const [maxHeight, setMaxHeight] = useState(500);
    const [maxWidth, setMaxWidth] = useState(500);
    const nodes = parseCommandsToNodes(props.commands.nodes);
    const edges = generateFakeEdges(nodes);

    useEffect(() => {
        getDimensions();
        window.addEventListener('resize', getDimensions);
        return () => {
            window.removeEventListener('resize', getDimensions);
        }
    }, []);

    const getDimensions = () => {
        const displayElement = document.getElementById('code-display');
        if (displayElement) {
            // console.log("found size:", displayElement.clientWidth, displayElement.clientHeight);
            setMaxHeight(displayElement.clientHeight - 64);
            setMaxWidth(displayElement.clientWidth - 64);
        }
    }

    return (
        <Box sx={styles.displayContainer}>
            <Canvas fit={true} zoomable={true}
                    maxHeight={maxHeight} maxWidth={maxWidth}
                    nodes={nodes}
                    edges={edges}
            />
        </Box>
    );
};

CodeDisplay.propTypes = {};

export default CodeDisplay;