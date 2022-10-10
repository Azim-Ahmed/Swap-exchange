import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    updateEdge,
    useStoreApi,
    useReactFlow,
} from "react-flow-renderer";
import { Delete as DeleteIcon } from "@material-ui/icons";
import {
    CustomNode,
    DataGridOfProcessNode,
    ConnectionLine,
    CustomEdge,
    DecisionNode,
} from "Components/FlowComponents";
import { Modal, CssTextField, TableModal } from "Components/Reusable";
import Layout from "Components/Layout";
import WebSocks from "../InitialSock/WebSocks";
import { useDispatch, useSelector } from "react-redux";
import {
    loadDiagramFromBackend,
    loadNodeDataToTheTableFromServer,
    cloaseEditableNodeDataToTheTable,
    getNewValueStream,
    getPersona,
    getProjectByUserId,
    sendValueStreamToGenerateKanban,
} from "redux/actions";
import { nanoid } from "nanoid";
import {
    makeStyles,
    Grid,
    Typography,
    Box,
    ClickAwayListener,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { edgeArrowId } from "Utils";
import { images } from "assets";
import { parse } from "zipson";

const nodeTypes = {
    process: CustomNode,
    decision: DecisionNode,
};
const edgeTypes = {
    custom: CustomEdge,
};
//loaded from api or Empty Array

const FinalDiagram = () => {
    const { search } = useLocation();
    const searchId = new URLSearchParams(search).get("streamId");
    //redux start
    const { decisionNodeInitialData, initialElements, valueStream, persona } =
        useSelector((state) => state.diagram);
    const auth = useSelector((state) => state.auth);
    const { projectId, kanbanId } = auth?.user;
    const dispatch = useDispatch();
    //main Elements State
    const [personaDataToTheNode, setPersonaDataToTheNode] = useState({});
    //main Elements of Diagram
    // const [elements, setElements] = useState([]);
    // const [edges, setEdges] = useState([]);
    const [elements, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    //component Did mount or unmount
    useEffect(() => {
        if (projectId) {
            dispatch(getNewValueStream(projectId));
            dispatch(loadDiagramFromBackend(projectId));
        }
    }, [projectId, dispatch]);
    useEffect(() => {
        dispatch(getPersona(projectId));
    }, [dispatch, projectId]);

    //initial Data or from backend uder the organization
    useEffect(() => {
        if (initialElements.messageContent) {
            const parsedContent = parse(initialElements?.messageContent);
            console.log({ parsedContent });
            const edgesForCanvas = parsedContent.filter(
                (item) => item?.type === "custom" && item
            );
            const nodesForCanvas = parsedContent.filter(
                (item) => !(item?.type === "custom")
            );
            console.log({ nodesForCanvas, edgesForCanvas, parsedContent });
            setNodes(nodesForCanvas);
            setEdges(edgesForCanvas);
        }
    }, [initialElements.messageContent]);

    useEffect(() => {
        if (auth.user?.id) {
            dispatch(getProjectByUserId(auth?.user?.id));
        }
    }, [auth?.user?.id, dispatch]);
    //stream Id

    useEffect(() => {
        const particularData = valueStream.find((stream) => stream.id === searchId);
        setPersonaDataToTheNode(particularData);
    }, [searchId, valueStream]);
    const store = useStoreApi();
    const { setCenter } = useReactFlow();
    //useRef for DOM node
    const reactFlowWrapper = useRef(null);
    //instance
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    //opening the Modal of form
    const [openDoubleClick, setOpenDoubleClick] = useState(false);
    //open Editor menu
    const [edgeEditModal, setEdgeEditModal] = useState(false);
    const [edgeLabel, setEdgeLabel] = useState("");
    //opening the Modal of form
    //modal Data
    const [updatedData, setUpdatedData] = useState({});
    const [deletedData, setdeletedData] = useState({});
    //state changes on websocket
    const [pendingRequest, setPendingRequest] = useState(false);

    useEffect(() => {
        dispatch(loadNodeDataToTheTableFromServer(updatedData.data?.nodeDataList));
    }, [updatedData, dispatch]);
    //#TODO

    const { nodeInternals } = store.getState();

    const focusNode = useCallback(
        (id) => {
            const { nodeInternals } = store.getState();
            const nodes = Array.from(nodeInternals).map(([, node]) => node);
            if (nodes.length > 0) {
                const newStepId = nodes.filter(
                    (item) => item?.data?.valueStreamId === id
                );
                const noFilteredData = nodes.filter(
                    (item) => item?.data?.valueStreamId === id
                );
                const noFilteredLastData =
                    noFilteredData.length === 0 &&
                    nodes.filter((item) => item?.type === "process")[nodes.length - 1];
                const firstNode = newStepId[0];
                if (firstNode) {
                    const x = firstNode?.position.x + firstNode?.width / 2;
                    const y = firstNode?.position.y + firstNode?.height / 2;
                    const zoom = 1;
                    setCenter(x + 400, y, { zoom, duration: 1000 });
                }
                if (noFilteredLastData) {
                    const x =
                        noFilteredLastData?.position.x + noFilteredLastData?.width / 2;
                    const y =
                        noFilteredLastData?.position.y + noFilteredLastData?.height / 2;
                    const zoom = 1;
                    setCenter(x + 500, y, { zoom, duration: 1000 });
                }
            }
        },
        [setCenter]
    );
    useEffect(() => {
        if (searchId) {
            focusNode(searchId, nodeInternals);
        }
    }, [searchId, focusNode]);

    // const onConnect = (params) => {
    //   const source = params?.source;
    //   let str = source;
    //   const newDecisionLineEdge = str.match(/decision/g);
    //   const target = params.target;
    //   const newEdgeId = edgeArrowId(source, target);
    //   const newSource = new Array(source);
    //   const newTarget = new Array(target);
    //   handleAddingSource(target, source);
    //   setEdges((els) =>
    //     addEdge(
    //       {
    //         type: "custom",
    //         style: { stroke: "black", strokeWidth: "1.5" },
    //         selectable: true,
    //         ...params,
    //         id: newEdgeId,
    //         labelBgBorderRadius: 4,
    //         MarkerType: MarkerType.Arrow,
    //         labelBgStyle: { fill: "white", stroke: "black" },
    //         data: {
    //           line: true,
    //           node: false,
    //           source: newSource,
    //           target: newTarget,
    //           text: newDecisionLineEdge ? "Line name" : "",
    //           label: "",
    //           decision: false,
    //           previousDecision: false,
    //           start: false,
    //           process: false,
    //           previousProcess: false,
    //           end: false,
    //           name: "",
    //           valueStreamId: personaDataToTheNode?.id,
    //           previousProcessName: "",
    //           previousProcessWhy: "",
    //           decisionLineName: "",
    //           persona: personaDataToTheNode?.persona,
    //           valueStreamName: personaDataToTheNode?.valueStreamName,
    //           valueStreamWhy: personaDataToTheNode?.valueStreamWhy,
    //           color: personaDataToTheNode?.color,
    //           processWhy: "",
    //           nodeDataList: [],
    //         },
    //       },
    //       els
    //     )
    //   );
    //   setPendingRequest(true);
    // };
    const onConnectToUpgrade = useCallback(
        (connection) => {
            const source = connection?.source;
            const target = connection.target;
            const newDecisionLineEdge = source.match(/decision/g);
            const newEdgeId = edgeArrowId(source, target);
            const newSource = new Array(source);
            const newTarget = new Array(target);
            handleAddingSource(target, source);
            setEdges((els) =>
                addEdge(
                    {
                        type: "custom",
                        style: { stroke: "black", strokeWidth: "1.5" },
                        selectable: true,
                        ...connection,
                        id: newEdgeId,
                        labelBgBorderRadius: 4,
                        arrowHeadType: "arrow",
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
                    },
                    els
                )
            );
            setPendingRequest(true);
            // setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
        },
        [setEdges, pendingRequest, edges]
    );

    const handleSubmitted = (e) => {
        if (!edgeLabel) return;
        const els = [...edges];
        const maped = els.map((el) => {
            if (el.id === updatedData?.id) {
                el.data.text = edgeLabel;
            }
            return el;
        });
        setEdges(maped);
        setPendingRequest(true);
        setEdgeEditModal(false);
        setEdgeLabel("");
    };
    const handleCloseModalData = () => {
        setEdgeEditModal(false);
        handleSubmitted();
    };
    const newModalForEdge = () => {
        return (
            <Modal open={edgeEditModal} handleClose={handleCloseModalData}>
                <Box p="25px" m="20px">
                    <form onSubmit={handleSubmitted}>
                        <CssTextField
                            type="text"
                            label="Line Name"
                            placeholder="Enter your Edge Line"
                            defaultValue={updatedData?.data?.text}
                            onChange={(e) => setEdgeLabel(e.target.value)}
                            variant="outlined"
                        />
                    </form>
                </Box>
                <Box display="flex" justifyContent="flex-end" mr="6px">
                    <IconButton
                        title="click to delete this edge"
                        onClick={() => handleDeleteElement(deletedData)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Modal>
        );
    };

    const handleAddingSource = (target, source) => {
        const newSource = new Array(source);
        const newTarget = new Array(target);

        if (target && source) {
            const els = [...elements, ...edges];
            const maped = els.map((el) => {
                if (el.id === target) {
                    if (el.data.source) {
                        const newUpdateSource = [...el.data.source];
                        const lastSourceArray = [...newUpdateSource, ...newSource];
                        el.data.source = [...new Set(lastSourceArray)];
                    } else {
                        el.data.source = [...newSource];
                    }
                }
                if (el.id === source) {
                    if (el.data.target) {
                        const newUpdateTarget = [...el.data.target];
                        const lastTargetArray = [...newUpdateTarget, ...newTarget];
                        el.data.target = [...new Set(lastTargetArray)];
                    } else {
                        el.data.target = [...newTarget];
                    }
                }
                return el;
            });
            setEdges(maped);
        }
    };

    // const onNodeClick = (event, element) => {
    //   console.log("ccccccccccccc", element);
    //   if (element.type === "process" || "decision") {
    //     const data = { ...element };
    //     setdeletedData(data);
    //     setOpen(true);
    //   }
    // };
    const onNodeClick = (event, node) => {
        event.preventDefault();
        // setNodeBg(node.style.backgroundColor)
        // setNodeName(node.data.label)
        // setSizeX(node.style.width)
        // setSizeY(node.style.height)
        // setType(node.type)
        // setID(node.id)
        if (node.type === "process") {
        }
        console.log("type: " + node.type);
        console.log("x " + node.style.width);
        console.log("y " + node.style.height);
        console.log("id: " + node.id);
        console.log("parent: " + node.parentNode);
    };
    // const onInit = (reactFlowInstance) => reactFlowInstance.zoomTo(1);
    const onEdgeClick = (event, element) => {
        if (element.type === "custom" && element?.data?.line) {
            const data = { ...element };
            setOpen(false);
            setUpdatedData(data);
            setEdgeEditModal(true);
            setdeletedData(data);
        }
    };

    const onEdgeUpdate = (oldEdge, newConnection) => {
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
        setPendingRequest(true);
    };
    const onElementsRemove = (elementsToRemove) => {
        console.log({ elementsToRemove });
        setNodes((els) => applyNodeChanges(elementsToRemove, els));
        setPendingRequest(true);
    };
    const onEdgesChange = useCallback(
        (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
        [setEdges]
    );
    const onNodesChange = useCallback(
        (changes) => setNodes((es) => applyNodeChanges(changes, es)),
        [setNodes]
    );
    const [open, setOpen] = useState(false);

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleDeleteElement = (datas) => {
        const newDara = new Array(datas);
        console.log({ newDara });
        onElementsRemove(newDara);
        setOpen(false);
        setEdgeEditModal(false);
    };
    const deleteElement = () => {
        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: "relative" }}>
                    {open ? (
                        <Box style={{ textAlign: "center" }}>
                            <Tooltip
                                title={deletedData?.data?.name ? deletedData?.data?.name : ""}
                                placement="left"
                                arrow
                            >
                                <Typography
                                    color="primary"
                                    style={{ marginTop: "0px", fontWeight: "600" }}
                                >
                                    {deletedData?.data?.name.substr(0, 6)}
                                </Typography>
                            </Tooltip>

                            <Tooltip title="delete  this workflow" placement="left" arrow>
                                <IconButton color="primary" aria-label="add an alarm">
                                    <DeleteIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDeleteElement(deletedData)}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : null}
                </Box>
            </ClickAwayListener>
        );
    };

    // const onInit = (_reactFlowInstance) => {
    //   setReactFlowInstance(_reactFlowInstance);
    // };
    const onNodeDragStop = (event, node) => {
        const data = { ...node };
        setUpdatedData(data);
        if (node) {
            const els = [...elements];
            const maped = els.map((el) => {
                if (el.id === data.id) {
                    el.position = node.position;
                }
                return el;
            });
            setNodes(maped);
            setPendingRequest(true);
        }
    };
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            if (typeof type === "undefined" || !type) {
                return;
            }
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode = {
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
                    previousProcessName: "",
                    previousProcessWhy: "",
                    decisionLineName: "",
                    valueStreamId: personaDataToTheNode?.id,
                    persona: personaDataToTheNode?.persona,
                    valueStreamName: personaDataToTheNode?.valueStreamName,
                    valueStreamWhy: personaDataToTheNode?.valueStreamWhy,
                    color: personaDataToTheNode?.color,
                    processWhy: "",
                    nodeDataList: [],
                },
            };
            setNodes((es) => es.concat(newNode));
            setOpenDoubleClick(true);
            const data = { ...newNode };
            setUpdatedData(data);
        },
        [reactFlowInstance, setNodes, personaDataToTheNode]
    );
    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        setError,
        getValues,
    } = useForm({
        mode: "all",
    });

    watch(["name", "processWhy"]);
    //TODOupdate Node Data of particular thing
    const onUpdateSubmit = (data) => {
        console.log("Azim", { data });
    };
    //renderTableModalForUpdateNode
    const processName = getValues("name");
    const processWhy = getValues("processWhy");
    useEffect(() => {
        if (updatedData?.data?.name) {
            setValue("name", updatedData.data?.name);
        }
        if (updatedData?.data?.processWhy) {
            setValue("processWhy", updatedData.data?.processWhy);
        }
        return () => reset();
    }, [updatedData.data, setValue, reset]);

    const handleCloseModal = () => {
        const dataExist =
            decisionNodeInitialData &&
            decisionNodeInitialData.some((item) => item.name === "");
        if (
            Object.values(errors).length > 0 ||
            !processName ||
            !processWhy ||
            dataExist
        ) {
            if (!processName) {
                setError("name", {
                    type: "validate",
                    message: "This is required",
                });
            }
            if (!processWhy) {
                setError("processWhy", {
                    type: "validate",
                    message: "This is required",
                });
            }
            return;
        }
        if (processName && processWhy && updatedData?.id) {
            const els = [...elements];
            const maped = els.map((el) => {
                if (el.id === updatedData.id) {
                    el.data.name = processName;
                    el.data.processWhy = processWhy;
                }
                return el;
            });
            setNodes(maped);
            setPendingRequest(true);
            renderTableOnWorkItem();
            reset();
            setOpenDoubleClick(false);
        }

        dispatch(cloaseEditableNodeDataToTheTable(false));
        setOpenDoubleClick(false);
    };
    //if condition matched
    const renderTableOnWorkItem = () => {
        const els = [...elements];
        const maped = els.map((el) => {
            if (el.id === updatedData.id) {
                el.data.nodeDataList = decisionNodeInitialData;
            }
            return el;
        });
        setNodes(maped);
        reset();
        setPendingRequest(true);
    };
    const renderFormUpdateOnDoubleClick = (updatedData) => {
        return (
            <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <Grid container>
                    <Grid item md={updatedData.type === "decision" ? 12 : 6}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={updatedData.data?.name}
                            rules={{
                                required: {
                                    value: true,
                                    message: "This is required",
                                },
                            }}
                            render={({ field }) => (
                                <CssTextField
                                    style={{ minWidth: "350px" }}
                                    {...field}
                                    id="my-input"
                                    label={
                                        updatedData.type === "decision"
                                            ? "Decision Name *"
                                            : "This process is called...*"
                                    }
                                    variant="outlined"
                                    type="text"
                                />
                            )}
                        />
                        {errors.name && (
                            <Typography style={{ margin: "0" }} color="error">
                                {errors.name.message}
                            </Typography>
                        )}
                    </Grid>
                    {updatedData.type === "decision" ? (
                        <Grid style={{ display: "none" }} item md={6}>
                            <Controller
                                name="processWhy"
                                control={control}
                                defaultValue={`processWhy of Decision`}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This is required",
                                    },
                                }}
                                render={({ field }) => (
                                    <CssTextField
                                        style={{ minWidth: "350px" }}
                                        {...field}
                                        label={`When this is done, persona will have:*`}
                                        variant="outlined"
                                        type="text"
                                    />
                                )}
                            />
                            {errors.processWhy && (
                                <Typography style={{ margin: "0", color: "red" }}>
                                    {errors.processWhy.message}
                                </Typography>
                            )}
                        </Grid>
                    ) : (
                        <Grid item md={6}>
                            <Controller
                                name="processWhy"
                                control={control}
                                defaultValue={updatedData.data?.processWhy}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This is required",
                                    },
                                }}
                                render={({ field }) => (
                                    <CssTextField
                                        style={{ minWidth: "350px" }}
                                        {...field}
                                        label={`When this is done, ${persona?.name} will have:*`}
                                        variant="outlined"
                                        type="text"
                                    />
                                )}
                            />
                            {errors.processWhy && (
                                <Typography style={{ margin: "0", color: "red" }}>
                                    {errors.processWhy.message}
                                </Typography>
                            )}
                        </Grid>
                    )}
                </Grid>
            </form>
        );
    };

    const renderTableModalForUpdateNodeData = () => {
        return (
            <TableModal open={openDoubleClick} handleClose={handleCloseModal}>
                {updatedData?.data?.name && (
                    <Box className={classes.table_header}>
                        <h1>{updatedData?.data?.name} </h1>
                    </Box>
                )}

                <Box className={classes.form_Style}>
                    {renderFormUpdateOnDoubleClick(updatedData)}
                </Box>
                {updatedData.type === "process" && (
                    <Box>
                        <DataGridOfProcessNode rows={decisionNodeInitialData} />
                    </Box>
                )}
            </TableModal>
        );
    };

    //onNodeDoubleClick
    //TODO need to update
    const onNodeDoubleClick = (event, element) => {
        setOpenDoubleClick(true);
        const data = { ...element };
        setUpdatedData(data);
    };

    const updatedArray = [...elements];
    let newArray = [];
    updatedArray.forEach((item) => {
        const { id, type, data } = { ...item };
        const newObject = { id, type, data };
        newArray.push(newObject);
        return newArray;
    });

    function generateKANBAN() {
        if (elements) {
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
            dispatch(
                sendValueStreamToGenerateKanban(
                    projectId,
                    newValueStreamFilter,
                    kanbanId
                )
            );
        }
    }

    //#TODO need to fix start and End
    const SideBar = () => {
        const onDragStart = (event, nodeType) => {
            event.dataTransfer.setData("application/reactflow", nodeType);
            event.dataTransfer.effectAllowed = "move";
        };
        return (
            <aside className={classes.asideArea}>
                <div className="description">
                    <Tooltip
                        title={
                            personaDataToTheNode?.valueStreamName
                                ? personaDataToTheNode?.valueStreamName
                                : ""
                        }
                        placement="left"
                        arrow
                    >
                        <Typography
                            variant="subtitle2"
                            style={{
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                width: "55px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                            component="h3"
                            color="primary"
                        >
                            {personaDataToTheNode?.valueStreamName}
                        </Typography>
                    </Tooltip>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Tooltip title="Process Node" placement="left" arrow>
                        <img
                            style={{
                                height: "40px",
                                width: "50px",
                                cursor: "grab",
                                margin: "10px 0px",
                            }}
                            onDragStart={(event) => onDragStart(event, "process")}
                            draggable
                            src={images.processDesign}
                            alt="Process Node"
                        />
                    </Tooltip>
                    <Tooltip title="Decision Node" placement="left" arrow>
                        <img
                            style={{
                                height: "40px",
                                width: "50px",
                                cursor: "grab",
                                margin: "10px 0px",
                            }}
                            onDragStart={(event) => onDragStart(event, "decision")}
                            draggable
                            src={images.decision}
                            alt="Decision Node"
                        />
                    </Tooltip>

                    {open && (
                        <div
                            style={{
                                color: "black",
                                height: "40px",
                                width: "50px",
                                margin: "10px 0px 20px 0px",
                                cursor: "pointer",
                            }}
                        >
                            {deleteElement()}
                        </div>
                    )}
                </div>
            </aside>
        );
    };
    const classes = useStyles();

    return (
        <Layout pageName={"Journey Map"} generateKanban={generateKANBAN} onDiagram>
            <Box className={classes.root}>
                <Box className={classes.wrapperFlow}>
                    <Box className={classes.reactflowWrapper} ref={reactFlowWrapper}>
                        <ReactFlow
                            nodeTypes={nodeTypes}
                            connectionLineComponent={ConnectionLine}
                            connectionLineType="smoothstep"
                            nodes={elements}
                            edges={edges}
                            deleteKeyCode="/"
                            multiSelectionKeyCode="Control"
                            onNodeClick={onNodeClick}
                            onEdgeClick={onEdgeClick}
                            onConnect={onConnectToUpgrade}
                            // onNodesChange={onElementsRemove}
                            onEdgesChange={onEdgesChange}
                            onNodesChange={onNodesChange}
                            onNodesDelete={handleDeleteElement}
                            onInit={setReactFlowInstance}
                            onNodeDragStop={onNodeDragStop}
                            // onNodeDrag={onNodeDragStop}
                            onDrop={onDrop}
                            fitview="true"
                            edgeTypes={edgeTypes}
                            // nodesDraggable={true}
                            onDragOver={onDragOver}
                            onNodeDoubleClick={onNodeDoubleClick}
                            onEdgeUpdate={onEdgeUpdate}
                            arrowheadcolor="#595A66"
                        >
                            <Background variant="dots" gap={10} size={0.8} />
                            <Controls />
                        </ReactFlow>
                    </Box>
                    <Box className={classes.sideBar}> {SideBar()}</Box>
                    {edgeEditModal && newModalForEdge()}
                    {openDoubleClick && renderTableModalForUpdateNodeData()}
                </Box>
            </Box>
            <WebSocks
                initialElements={initialElements}
                setNodes={setNodes}
                setEdges={setEdges}
                elements={elements}
                edges={edges}
                pendingRequest={pendingRequest}
                setPendingRequest={setPendingRequest}
            />
        </Layout>
    );
};

export default FinalDiagram;

const useStyles = makeStyles(() => ({
    table_header: {
        border: "1px solid gray",
        background: "#005ae5",
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0px 20px",
        marginBottom: "30px",
    },
    sideBar: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
    },
    asideArea: {
        padding: " 15px 10px",
        fontSize: " 12px",
        background: "#F3EBFF",
        height: "376px",
        borderRadius: "40% 0px 0px 40%",
        border: "1px solid #dedede",
        boxSizing: " border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        width: " 77px",
        zIndex: "1000",
        maxWidth: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        clipPath:
            "polygon(125% 0%, 100% 25%, 100% 75%, 125% 100%, 0% 80%, -10% 15%)",
    },
    wrapperFlow: {
        flexDirection: "column",
        display: " flex",
        height: `calc(100vh - ${80}px)`,
        flexBasis: "100px",
        overflow: "hidden",
    },
    reactflowWrapper: {
        height: `100vh`,
    },
    form_Style: {
        minWidth: "800px",
        marginTop: "20px",
    },
}));
