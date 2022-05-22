import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import {Box, Divider, Paper, Typography} from "@mui/material";
import React from "react";
import {css} from "@emotion/react";
import VarChip from "../components/VarChip";
import {scrollbar} from "./css-mixins";

// this method picks and chooses how each node looks!
const handleNodeRender = (e, theme, onVarsClick) => {
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
        `,
        nodeHeader: css`
          align-self: flex-start;
          width: 100%;
          cursor: default;
        `,
        outputContainer: css`
          height: calc(100% - 4px);
          width: 250px;
          position: absolute;
          right: 2px;
          box-sizing: border-box;
          border-radius: 0;
          border-right: 0;
          border-bottom: 0;
          border-top: 0;
          cursor: default;
        `,
        outputBox: css`
          padding: 1em;
          box-sizing: border-box;
          white-space: pre;
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
          &:hover {
            border-color: ${theme.palette.primary.light};
          }
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
            default:
                return "";
        }
    }

    let content = e.node.data.command;
    let rootStyles = [styles.nodeContainer];

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
                >
                    {e.node.data.command}
                </SyntaxHighlighter>
            );
            rootStyles.push(styles.clickableNode);
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

        // THE BEHEMOTH
        case "wrapper":
            let showOutput = e.node.data.output.length > 0;
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
        <foreignObject height={e.height} width={e.width} x={0} y={0}>
            <Paper variant="outlined" sx={rootStyles}>
                {content}
            </Paper>
        </foreignObject>
    );
};

const generateVarChips = (vars) => {
    return vars.map(v => <VarChip name={v.var_name} value={v.value} key={v.pk}/>);
};

export {
    handleNodeRender,
    generateVarChips
}