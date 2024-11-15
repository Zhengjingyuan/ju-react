import { REACT_ELEMENT_TYPE } from "share/ReactSymbols";
import { FiberNode, createFiberFromElement } from "./fiber";
import { ReactElementType } from "share/ReactTypes";
import { HostText } from "./workTags";
import { Placement } from "./fiberFlags";

//shouldTrackEffects:是否追踪副作用]
function ChildReconciler(shouldTrackEffects: boolean) {

    function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	){
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;

    }

    function reconcileSingeTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}

    //插入单一的节点
	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}


    return function reconcileChildFibers(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: any
	){
        //判断当前fiber的类型
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);

				default:
					if (__DEV__) {
						console.warn('未实现的reconcile类型', newChild);
					}
			}
		}

		//HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingeTextNode(returnFiber, currentFiber, newChild)
			);
		}
		if (__DEV__) {
			console.warn('未实现的reconcile类型', newChild);
		}
		return null;
	};

    };


export const reconcileChildFibers = ChildReconciler(true); //UPDATE
export const mountChildFibers = ChildReconciler(false); //MOUNT