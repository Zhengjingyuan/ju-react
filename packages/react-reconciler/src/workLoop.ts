import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { createWorkInProgress, FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTags";


//当前正在工作的FiberNode
let workInprogress: FiberNode | null;

function prepareFreshStack(root: FiberRootNode) {
	workInprogress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode){
    //调度功能
    const root = markUpdateFromFiberToRoot(fiber);
    renderRoot(root);
}

//向上遍历到根节点
function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function renderRoot(root:FiberRootNode) {
    //初始化
    prepareFreshStack(root);

    do{
        try{
            workLoop();
            break;
        }catch (e) {
            console.warn('workLoop发生错误',e);
            workInprogress = null;
        }
    }while(true);
}

function workLoop() {
    while (workInprogress !== null) {
        performUnitOfWork(workInprogress);
    }
}

function performUnitOfWork(fiber: FiberNode) {
    const next: FiberNode | null = beginWork(fiber);
    //将pendingProps赋值给memoizeProps
    fiber.memoizedProps = fiber.pendingProps;

    if (next === null) {
        completeUnitOfWork(fiber);
    } else {
        workInprogress = next;
    }
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(node);

		const sibling = node.sibling;

		if (sibling !== null) {
			workInprogress = sibling;
			return;
		}
		node = node.return;
		workInprogress = node;
	} while (node !== null);
}