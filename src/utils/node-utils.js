
const parseCommandsToNodes = commands => {
    let parsed = [];
    if (commands) {
        parsed = commands.map(cmd => {
            return {
                id: cmd.pk,
                text: cmd.command,
                data: {
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

const generateFakeEdges = nodes => {
    let edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        let from = nodes[i].id;
        let to = nodes[i+1].id;
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
    generateFakeEdges
}