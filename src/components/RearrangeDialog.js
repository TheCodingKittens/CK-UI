import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Icon,
    List,
    ListItem,
    Paper,
    Typography
} from "@mui/material";
import {css, useTheme} from "@emotion/react";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import {scrollbar} from "../utils/css-mixins";

const NodeHighlighter = props => (
    <SyntaxHighlighter
        language="python"
        style={oneDark}
        customStyle={{
            backgroundColor: 'transparent',
            margin: '0.5em 2em'
        }}
        wrapLongLines
    >
        {props.children}
    </SyntaxHighlighter>
);

const RearrangeDialog = props => {
    const theme = useTheme();
    const styles = {
        list: css`
          max-height: 20em;
          overflow-y: auto;
          ${scrollbar(theme)}
        `,
        editNodeContainer: css`
          display: flex;
          justify-content: center;
          color: ${theme.palette.primary.light};
        `,
        listItem: css`
          justify-content: center;
          cursor: pointer;
        `,
        listNodeContainer: css`
          transition: border 0.25s;

          &:hover {
            border-color: ${theme.palette.primary.light};
          }
        `,
        selectedItem: css`
          border-color: ${theme.palette.primary.light};
        `
    }
    const [swapNode, setSwapNode] = useState(null);

    const handleClose = success => {
        if (props.onClose) props.onClose(success, swapNode);
    }

    const handleSelect = node => {
        if (swapNode && swapNode.id === node.id) {
            setSwapNode(null);
        } else {
            setSwapNode(node);
        }
    }

    const swapNodes = [];

    if (props.editNode) {
        for (let n of props.nodes.filter(pn => pn.type === 'wrapper')) {
            if (n.id === props.editNode.id) continue;

            let itemStyle = [styles.listNodeContainer];
            if (swapNode && (swapNode.id === n.id)) {
                itemStyle.push(styles.selectedItem);
            }

            swapNodes.push(
                <ListItem sx={styles.listItem} onClick={() => handleSelect(n)} key={n.id}>
                    <Paper variant="outlined" sx={itemStyle}>
                        <NodeHighlighter>
                            {n.data.command}
                        </NodeHighlighter>
                    </Paper>
                </ListItem>
            );
        }
    }

    return (
        <Dialog
            open={props.open} onClose={() => handleClose()}
            PaperProps={{sx: {background: theme.palette.background.paper, minWidth: '30em', maxWidth: '80vw'}}}
        >
            <DialogTitle>
                Swap two nodes
            </DialogTitle>
            <DialogContent>
                <Box sx={styles.editNodeContainer}>
                    <Paper variant="outlined">
                        <NodeHighlighter>
                            {props.editNode && props.editNode.data.command}
                        </NodeHighlighter>
                    </Paper>
                </Box>
                <br/>
                <Box sx={styles.editNodeContainer}>
                    <Icon color={swapNode ? "inherit" : "disabled"} sx={{transition: 'color 0.25s'}}>
                        swap_vert
                    </Icon>
                </Box>
                <br/>
                <Paper variant="outlined">
                    <List sx={styles.list}>
                        {swapNodes}
                    </List>
                </Paper>
                <br/>
                <Typography color="textSecondary">
                    To rearrange nodes, select one from the list below and click "swap".
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>
                    Cancel
                </Button>
                <Button onClick={() => handleClose(true)} disabled={!swapNode}>
                    Swap
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RearrangeDialog.defaultProps = {
    nodes: [],
    editNode: {}
};

RearrangeDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    editNode: PropTypes.object,
    nodes: PropTypes.array
};

export default RearrangeDialog;