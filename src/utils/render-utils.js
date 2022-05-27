import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import {Box, Divider, Icon, IconButton, Paper, Typography} from "@mui/material";
import React from "react";
import {css} from "@emotion/react";
import VarChip from "../components/VarChip";
import {scrollbar} from "./css-mixins";
import VarsDialog from "../components/VarsDialog";

// this method picks and chooses how each node looks!
const handleNodeRender = (e, theme, onVarsClick, onMoreClick, onNodeClick) => {
    const styles = {
        displayContainer: css`
          max-width: 100%;
          max-height: 100%;
        `,
        nodeContainer: css`
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        `,
        wrapperContainer: css`
        `,
        nodeHeader: css`
          align-self: flex-start;
          width: 100%;
          cursor: default;
          height: 25px;
        `,
        outputContainer: css`
          height: calc(100% - 4px);
          width: 250px;
          position: absolute;
          right: 3px;
          box-sizing: border-box;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-right: none;
          border-bottom: none;
          border-top: none;
          cursor: default;
          display: flex;
          flex-direction: column;
        `,
        outputBox: css`
          padding: 1em;
          box-sizing: border-box;
          white-space: pre;
          overflow: auto;
          ${scrollbar(theme)}
        `,
        varsContainer: css`
          position: absolute;
          bottom: 2px;
          left: 2px;
          width: calc(100% - 250px - 4px);
          height: 150px;
          display: flex;
          flex-direction: column;
          cursor: default;
        `,
        varChipBox: css`
          width: 100%;
          flex-grow: 1;
          overflow: auto;
          cursor: pointer;
          ${scrollbar(theme)}
        `,
        clickableNode: css`
          cursor: pointer;
          transition: border 0.25s ease-in-out;
          padding: 0 1em;

          &:hover {
            border-color: ${theme.palette.primary.light};
          }
        `,
        optionsContainer: css`
          box-sizing: border-box;
          position: absolute;
          right: 3px;
          bottom: 3px;
          color: ${theme.palette.text.secondary};
          border-bottom: none;
          border-right: none;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          z-index: 1;
        `
    };

    const getHeaderText = nodeType => {
        switch (nodeType) {
            case "If.body":
                return "if true:";
            case "If.else":
                return "else:";
            case "While.body":
                return "while true:";
            case "For.body":
                return "for each iteration:";
            case "Func.body":
                return "when called, do:";
            default:
                return "";
        }
    }

    let content = e.node.data.command;
    let rootStyles = [styles.nodeContainer];
    let clickable = false;

    switch (e.node.type) {
        case "Line":
        case "If.test":
        case "While.test":
        case "For.test":
            content = (
                <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{backgroundColor: 'transparent'}}
                    wrapLongLines
                >
                    {e.node.data.command}
                </SyntaxHighlighter>
            );
            rootStyles.push(styles.clickableNode);
            clickable = true;
            break;

        case "If.body":
        case "If.else":
        case "While.body":
        case "For.body":
            content = (
                <Box sx={styles.nodeHeader}>
                    <Typography color="textSecondary" style={{marginLeft: '0.5em'}}>
                        {getHeaderText(e.node.type)}
                    </Typography>
                    <Divider/>
                </Box>
            );
            break;

        case "function":
            content = (
                <Box sx={styles.nodeHeader}>
                    <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        customStyle={{
                            backgroundColor: 'transparent',
                            padding: '2.5px 0',
                            margin: 0,
                            marginLeft: '0.5em'
                        }}
                        wrapLongLines
                    >
                        {e.node.data.command}
                    </SyntaxHighlighter>
                    <Divider/>
                </Box>
            );
            break;

        // THE BEHEMOTH
        case "wrapper":
            let showOutput = e.node.data.output.length > 0;
            rootStyles.push(styles.wrapperContainer);
            content = (
                <>
                    {showOutput &&
                    <Paper variant="outlined" sx={styles.outputContainer}>
                        <Typography color="primary.light" style={{marginLeft: '0.5em'}}>
                            output
                        </Typography>
                        <Divider/>
                        {/*TODO: handle scroll*/}
                        <Box sx={styles.outputBox}>
                            {e.node.data.output}
                        </Box>
                    </Paper>
                    }
                    <Paper variant="outlined" sx={styles.optionsContainer}>
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={event => onMoreClick(event, e.node)}
                        >
                            <Icon>more_vert</Icon>
                        </IconButton>
                    </Paper>
                    <Box sx={styles.varsContainer} style={showOutput ? {} : {width: "calc(100% - 4px)"}}>
                        <Divider/>
                        <Typography color="primary.light" style={{marginLeft: '0.5em'}}>
                            current variables
                        </Typography>
                        <Divider/>
                        <Box sx={styles.varChipBox} onClick={() => onVarsClick(e.node)}>
                            {generateVarChips(e.node.data.variables)}
                        </Box>
                    </Box>
                </>
            );
            break;
    }

    return (
        <foreignObject
            height={e.height} width={e.width}
            x={0} y={0}
            style={{overflow: 'visible'}}
        >
            <Paper
                variant="outlined"
                sx={rootStyles}
                onClick={clickable ? () => onNodeClick(e.node) : null}
            >
                {content}
            </Paper>
        </foreignObject>
    );
};

const generateVarChips = (vars) => {
    if (!vars) return [];

    return vars.map(v =>
        <VarChip
            name={v.var_name}
            value={v.type === 'general' ? v.value : JSON.parse(v.value)}
            type={v.type}
            key={v.pk}
        />
    );
};

const getEdgeStyle = (edge, theme) => {
    let style = {stroke: '#6c6c6c'};

    if (edge.data && edge.data.executed === "True") {
        style.stroke = theme.palette.text.primary;
    }

    return style;
}

export {
    handleNodeRender,
    generateVarChips,
    getEdgeStyle
}