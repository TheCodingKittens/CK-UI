import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Canvas, Edge, MarkerArrow, Node} from "reaflow";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Icon, ListItemIcon, ListItemText, Menu, MenuItem,
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
import {getEdgeStyle, handleNodeRender} from "../utils/render-utils";
import {scrollbar} from "../utils/css-mixins";
import VarsDialog from "./VarsDialog";

SyntaxHighlighter.registerLanguage('python', py);

const CodeDisplay = props => {
    const theme = useTheme();
    const styles = {
        displayContainer: css`
          max-width: 100%;
          max-height: 100%;
          overflow-x: hidden;
          ${scrollbar(theme)}
        `
    };
    const [maxHeight, setMaxHeight] = useState(500);
    const [maxWidth, setMaxWidth] = useState(500);
    const [layoutHeight, setLayoutHeight] = useState('100%');
    const [editNode, setEditNode] = useState(null);
    const [detailsNode, setDetailsNode] = useState(null);
    const [newCommand, setNewCommand] = useState('');
    const [openWrapperMenu, setOpenWrapperMenu] = useState(false);
    const [wrapperMenuAnchor, setWrapperMenuAnchor] = useState(null);
    const [menuNode, setMenuNode] = useState(null);

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

    const handleNodeClick = (node) => {
        console.log(node);
        setNewCommand(node.data.command);
        setEditNode(node);
    };

    const handleEditClose = (save) => {
        if (save && props.onEdit) {
            props.onEdit(editNode, newCommand);
        }
        setEditNode(null);
        setNewCommand(null);
    };

    const handleLayoutChange = (layout) => {
        if (layout.height !== layoutHeight) {
            setLayoutHeight(layout.height);
            document.getElementById('code-scroller').scrollIntoView();
        }
    };

    const handleVarsClick = (node) => {
        console.log("i was clicked!", node);
        setDetailsNode(node);
    };

    const handleMoreClick = (event, node) => {
        setWrapperMenuAnchor(event.currentTarget);
        setMenuNode(node);
        setOpenWrapperMenu(true);
    };

    const handleDeleteClick = () => {
        if (!menuNode || !props.onDelete) return;
        props.onDelete(menuNode);
    };

    const handleRearrangeClick = () => {
        if (!menuNode) return;
    };

    return (
        <Box sx={styles.displayContainer} style={{width: maxWidth, height: maxHeight}}>
            <Canvas fit={false} zoomable={true} pannable={false} readonly
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
                            {event =>
                                handleNodeRender(
                                    event,
                                    theme,
                                    handleVarsClick,
                                    handleMoreClick,
                                    handleNodeClick
                                )}
                        </Node>
                    )}
                    arrow={<MarkerArrow style={{fill: theme.palette.text.primary}}/>}
                    edge={(edge) => (
                        <Edge
                            {...edge}
                            style={getEdgeStyle(edge, theme)}
                        />
                    )}
                    layoutOptions={{
                        spacing: '40',
                        'spacing.nodeNodeBetweenLayers': '40',
                        'elk.layered.spacing.edgeNodeBetweenLayers': '40'
                    }}
            />
            <Box id="code-scroller"/>
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
            <VarsDialog
                open={!!detailsNode}
                onClose={() => setDetailsNode(null)}
                node={detailsNode}
            />
            <Menu
                anchorEl={wrapperMenuAnchor}
                open={openWrapperMenu}
                onClose={() => setOpenWrapperMenu(false)}
                onClick={() => setOpenWrapperMenu(false)}
            >
                <MenuItem onClick={handleRearrangeClick} disabled>
                    <ListItemIcon><Icon>unfold_more</Icon></ListItemIcon>
                    <ListItemText>Rearrange nodes</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                    <ListItemText>Delete node</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

CodeDisplay.propTypes = {};

export default CodeDisplay;