import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Canvas, Edge, MarkerArrow, Node} from "reaflow";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import {css} from "@emotion/react";
import {generateFakeEdges, getNodeStyle, parseCommandsToNodes} from "../utils/node-utils";
import CodeEditor from "@uiw/react-textarea-code-editor";

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
    const [editNode, setEditNode] = useState(null);
    const [newCommand, setNewCommand] = useState('');
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
        const displayCard = document.getElementById('display-card');
        const displayHeader = document.getElementById('display-header');
        if (displayCard) {
            setMaxHeight(displayCard.clientHeight - displayHeader.clientHeight - 4);
            setMaxWidth(displayCard.clientWidth - 4);
        }
    }

    const handleNodeClick = (e, node) => {
        console.log(node);
        setNewCommand(node.command.command);
        setEditNode(node);
        e.preventDefault();
    };

    const handleEditClose = (save) => {
        setEditNode(null);
        setNewCommand(null);
    };

    return (
        <Box sx={styles.displayContainer}>
            <Canvas fit={true} zoomable pannable readonly
                    maxHeight={maxHeight} maxWidth={maxWidth}
                    nodes={nodes}
                    edges={edges}
                    node={(node) => (
                        <Node
                            {...node}
                            onClick={() => console.log(node.properties.data)}
                            style={{
                                fill: 'transparent',
                                stroke: 'none',
                                fontFamily: theme.typography.fontFamily
                            }}
                        >
                            {event => (
                                <foreignObject height={event.height} width={event.width} x={0} y={0}
                                               style={{zIndex: -1}}>
                                    <Paper
                                        sx={getNodeStyle(node.properties.data, theme)}
                                        onClick={(e) => handleNodeClick(e, node.properties.data)}
                                    >
                                        {/*<SyntaxHighlighter*/}
                                        {/*    language="python"*/}
                                        {/*    style={tomorrowNight}*/}
                                        {/*    customStyle={{*/}
                                        {/*        backgroundColor: 'transparent'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    {node.properties.data.command.command}*/}
                                        {/*</SyntaxHighlighter>*/}
                                        <Typography
                                            sx={{fontFamily: 'Source Code Pro, sans-serif', textAlign: 'center'}}>
                                            {node.properties.data.command.command}
                                        </Typography>
                                    </Paper>
                                </foreignObject>
                            )}
                        </Node>
                    )}
                    arrow={<MarkerArrow style={{fill: theme.palette.text.primary}}/>}
                    edge={(edge) => (
                        <Edge
                            {...edge}
                            style={{stroke: theme.palette.text.primary}}
                        />
                    )}
            />
            <Dialog
                open={!!editNode} onClose={() => handleEditClose()}
                PaperProps={{sx: {background: theme.palette.background.paper}}}
            >
                <DialogTitle>
                    Edit existing node
                </DialogTitle>
                <DialogContent>
                    <Paper variant="outlined" sx={{overflow: "hidden"}}>
                        <CodeEditor
                            language="python"
                            style={{background: theme.palette.background.default}}
                            value={newCommand}
                            onChange={e => setNewCommand(e.target.value)}
                        />
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleEditClose(false)}>Cancel</Button>
                    <Button onClick={() => handleEditClose(true)}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

CodeDisplay.propTypes = {};

export default CodeDisplay;