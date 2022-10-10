import { nanoid } from 'nanoid';
import { MarkerType } from 'react-flow-renderer';

export const edgeArrowId = (source, target) => {
    return `${source}>${target}`;
}
export const getValueStreamForCSV = (valueStream, elements, persona) => {
    const newValueStream = valueStream.map((item) => {
        return elements.filter(
            (item1) => item1.data.valueStreamId === item.id && item1
        );
    });
    const newValueStreamFilter = valueStream.map((item, index) => {
        const newObj = {
            valueStreamId: item.id,
            elementsDtoList: newValueStream[index],
            valueStreamName: item.valueStreamName,
            valueStreamWhy: item.valueStreamWhy,
            persona: persona?.name,
        };
        return newObj;
    });
    return newValueStreamFilter;
}
export const newNode = (type, position, personaDataToTheNode) => {
    let newNodes = {
        id: `node_${type}_${nanoid(15)}`,
        type,
        position,
        data: {
            line: false,
            node: true,
            label: `${type} node`,
            decision: type === "decision",
            previousDecision: false,
            start: false,
            process: type === "process",
            previousProcess: false,
            end: false,
            text: "",
            source: [],
            target: [],
            name: "",
            processWhy: "",
            previousProcessName: "",
            previousProcessWhy: "",
            decisionLineName: "",
            valueStreamId: personaDataToTheNode?.id,
            persona: personaDataToTheNode?.persona,
            valueStreamName: personaDataToTheNode?.valueStreamName,
            valueStreamWhy: personaDataToTheNode?.valueStreamWhy,
            color: personaDataToTheNode?.color,
            nodeDataList: [],
        },
    };
    return newNodes;
}

export const addEdged = (connection, newEdgeId, newSource, newTarget, newDecisionLineEdge, personaDataToTheNode) => {
    let Edge = {
        type: "custom",
        style: { stroke: "black", strokeWidth: "1.5" },
        selectable: true,
        ...connection,
        id: newEdgeId,
        arrowHeadType: "arrow",
        labelBgBorderRadius: 4,
        markerStart: { type: MarkerType.Arrow },
        markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
        labelBgStyle: { fill: "white", stroke: "black" },
        data: {
            line: true,
            node: false,
            source: newSource,
            target: newTarget,
            text: newDecisionLineEdge ? "Line name" : "",
            label: "",
            decision: false,
            previousDecision: false,
            start: false,
            process: false,
            previousProcess: false,
            end: false,
            name: "",
            valueStreamId: personaDataToTheNode?.id,
            previousProcessName: "",
            previousProcessWhy: "",
            decisionLineName: "",
            persona: personaDataToTheNode?.persona,
            valueStreamName: personaDataToTheNode?.valueStreamName,
            valueStreamWhy: personaDataToTheNode?.valueStreamWhy,
            color: personaDataToTheNode?.color,
            processWhy: "",
            nodeDataList: [],
        },
    }
    return Edge;
}