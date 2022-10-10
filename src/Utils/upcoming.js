class Flow {
    constructor(data) {
        this.nodes = []
        this.drawNode(data)
    }

    removeNode(nodeId) {
        this.nodes = this.nodes.filter(node => node.id === nodeId)
    }

    getNode(nodeId) {
        return this.nodes.find(node => node.id === nodeId)
    }

    getParentNode(nodeId) {
        return this.nodes.find(node => node.id === this.getNode(nodeId).parentId)
    }

    moveDownNode(nodeId) {
        this.getNode(nodeId).position.y += 120
    }

    haveChildren(nodeId) {
        return this.nodes.filter(node => node.parentId === nodeId).length > 0
    }
    getChildrenNode(nodeId) {
        return this.nodes.filter(node => node.parentId === nodeId)
    }

    getHeight(nodeId) {
        let height = this.haveChildren(nodeId) ? this.getChildrenNode(nodeId).length + this.getChildrenNode(nodeId).reduce((pre, cur) => pre + this.getHeight(cur), 0) : 0
        return height
    }
    getAncestorPath(nodeId) {
        let arr = [nodeId]
        let curNode = this.nodes.find(node => node.id === nodeId)
        while (curNode.parentId !== null) {
            let parId = curNode.parentId
            arr.push(parId)
            curNode = this.nodes.find(node => node.id === parId)
        }
        return arr
    }
    insertNode(node) {
        let parentNode = this.getNode(node.parentId)

        this.nodes.filter(n => n.type === "department").filter(n => n.position.y > parentNode.position.y && !this.getAncestorPath(n.id).includes(node.parentId)).forEach(n => {
            this.moveDownNode(n.id)
        });

        let height = this.getHeight(parentNode.id)
        this.nodes.push({
            id: node.id,
            type: "department",
            data: node.data,
            position: { x: parentNode.position.x + 200, y: parentNode.position.y + (height + 1) * 120 },
            parentId: node.parentId
        }, {
            id: "e" + node.id,
            source: node.parentId,
            target: node.id,
            type: "step"
        })
    }
    drawNode(data) {
        let rootNode = data.find(node => node.parentId === null)
        this.nodes.push({
            id: rootNode.id,
            type: "department",
            data: rootNode.data,
            position: { x: 0, y: 0 },
            parentId: null
        })
        let nodeDataQueue = data.filter(node => node.parentId !== null)
        while (nodeDataQueue.length > 0) {
            let curNodeData = nodeDataQueue.pop()
            //check if parent node is drawn. if true, draw the node
            if (this.nodes.map(node => node.id).includes(curNodeData.parentId)) {
                this.insertNode(curNodeData)
            }
            else
                nodeDataQueue.unshift(curNodeData)
        }
    }
}
export default Flow

// if (addCardsToIceBoxInTheBoard) {
//     const updatedToTheIceBox = addCardsToIceBoxInTheBoard.map((item) => {
//       const formDataToCreateCardForIcebox = new FormData();
//       const cardIdForIceBox = `node_process_${nanoid(15)}`;
//       const dueDate = selectedDate ? selectedDate : "";
//       formDataToCreateCardForIcebox.append("attachmentList", []);
//       const finalBlockers = [...riskAndIssuesData?.appendedBlockers];
//       if (finalBlockers) {
//         for (const blocker of finalBlockers) {
//           formDataToCreateCardForIcebox.append(
//             "blockers",
//             JSON.stringify(blocker)
//           );
//         }
//       }
//       formDataToCreateCardForIcebox.append("epicId", "");
//       formDataToCreateCardForIcebox.append("dueDate", dueDate);
//       formDataToCreateCardForIcebox.append("id", cardIdForIceBox);
//       //working
//       formDataToCreateCardForIcebox.append("bugsLabel", "");
//       formDataToCreateCardForIcebox.append("choresLabel", item?.title);
//       formDataToCreateCardForIcebox.append("linkToDesign", "");
//       formDataToCreateCardForIcebox.append("description", "");
//       formDataToCreateCardForIcebox.append("draggable", true);
//       formDataToCreateCardForIcebox.append("label", "");
//       formDataToCreateCardForIcebox.append(
//         "laneId",
//         "62f7be6a887bab640c765b92"
//       );
//       // rawContentForIceBox
//       // formDataToCreateCardForIcebox.append(
//       //   "laneId",
//       //   kanbanData.find(
//       //     (item) => item.label === "Ice Box" && item.title === "Ice Box"
//       //   )?.id
//       // );
//       const writingComment = {
//         id: `notes_${nanoid(12)}`,
//         comment: riskAndIssuesData.rawContentForIceBox(domLocation),
//         projectId: user?.projectId,
//         cardId: cardIdForIceBox,
//         userId: user?.id,
//         cretedDate: new Date(),
//       };
//       formDataToCreateCardForIcebox.append(
//         "metadata",
//         JSON.stringify([writingComment])
//       );
//       formDataToCreateCardForIcebox.append("title", "");
//       formDataToCreateCardForIcebox.append("userId", item?.userId);
//       formDataToCreateCardForIcebox.append("estimateHour", 0);
//       formDataToCreateCardForIcebox.append("type", "chore");
//       if (sizeOfProblem === 0) {
//         formDataToCreateCardForIcebox.append("size", 0);
//       }
//       for (let pic of []) {
//         formDataToCreateCardForIcebox.append("attachments", pic);
//       }

//       // TODO

//       return formDataToCreateCardForIcebox;
//       // dispatch(
//       //   addNewCardToKanban(
//       //     user?.projectId,
//       //     formDataToCreateCardForIcebox,
//       //     JSON.stringify([]),
//       //     cardId,
//       //     user?.kanbanId
//       //   )
//       // );
//     });
//     dispatch(
//       addNewLaneForDefaultKanban(
//         user?.projectId,
//         user?.kanbanId,
//         updatedToTheIceBox,
//         cardId,
//         cardData?.id
//       )
//     );
//   }