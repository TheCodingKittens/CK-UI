const parseCommandsToNodes = commands => {
    let parsed = [];
    if (commands) {
        parsed = commands.map(cmd => {
            return {
                id: cmd.pk,
                // text: cmd.command,
                width: cmd.command.length * 11 + 20,
                height: 50,
                data: {
                    command: cmd,
                    type: 'command' // TODO: update once backend sends the types
                }
            };
        });
    }
    return parsed;
};

const parseEdges = edges => {
    let parsed = [];
    if (edges) {

    }
    return parsed;
};

const getNodeStyle = (data, theme) => {
    let style;
    switch (data.type) {
        case 'command':
        default:
            style = {
                backgroundColor: theme.palette.primary.dark
            };
            break;

    }
    return {
        ...style,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
};

const generateFakeEdges = nodes => {
    let edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        let from = nodes[i].id;
        let to = nodes[i + 1].id;
        edges.push({
            id: `${from}-${to}`,
            from, to
        });
    }
    return edges;
};


export {
    parseCommandsToNodes,
    parseEdges,
    getNodeStyle,
    generateFakeEdges
}