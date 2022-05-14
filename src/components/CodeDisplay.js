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
    useTheme
} from "@mui/material";
import {css} from "@emotion/react";
import {
    parseCommandsToNodes,
    parseEdges
} from "../utils/node-utils";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import py from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import onedark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';

SyntaxHighlighter.registerLanguage('python', py);

const CodeDisplay = props => {
    const theme = useTheme();
    const styles = {
        displayContainer: css`
          max-width: 100%;
          max-height: 100%;
          overflow-x: hidden;
        `,
        nodeContainer: css`
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
        `
    };
    const [maxHeight, setMaxHeight] = useState(500);
    const [maxWidth, setMaxWidth] = useState(500);
    const [layoutHeight, setLayoutHeight] = useState('100%');
    const [editNode, setEditNode] = useState(null);
    const [newCommand, setNewCommand] = useState('');
    const nodes = parseCommandsToNodes(props.commands, theme);
    let edges = parseEdges(props.commands);

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
        if (save && props.onEdit) {
            props.onEdit(editNode, newCommand);
        }
        setEditNode(null);
        setNewCommand(null);
    };

    const handleLayoutChange = (layout) => {
        setLayoutHeight(layout.height);
    };

    const handleNodeRender = e => {
        console.log(e);

        let content = e.node.data.command;

        switch (e.node.type) {
            case "Line":
            case "If.test":
                content = (
                    <SyntaxHighlighter
                        language="python"
                        style={onedark}
                        customStyle={{backgroundColor: 'transparent'}}
                    >
                        {e.node.data.command}
                    </SyntaxHighlighter>
                );
                break;
        }

        return (
            <foreignObject height={e.height} width={e.width} x={0} y={0}>
                <Paper variant="outlined" sx={styles.nodeContainer}>
                    {content}
                </Paper>
            </foreignObject>
        );
    };

    return (
        <Box sx={styles.displayContainer} style={{width: maxWidth, height: maxHeight}}>
            <Canvas fit={false} zoomable={false} pannable={false} readonly
                    defaultPosition="top"
                    height={layoutHeight}
                    maxWidth={maxWidth}
                    nodes={nodes}
                    edges={edges}
                    onLayoutChange={l => handleLayoutChange(l)}
                    node={(node) => (
                        <Node
                            {...node}
                            offsetX={Math.random() * 100}
                            onClick={() => console.log(node.properties.data)}
                            style={{
                                fill: 'transparent',
                                stroke: 'none',
                                overflow: 'visible',
                                fontFamily: theme.typography.fontFamily
                            }}
                        >
                            {event => handleNodeRender(event)}
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