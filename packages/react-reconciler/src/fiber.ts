import { Props, Key, Ref } from "share/ReactTypes";
import { WorkTag } from "./workTags";
import { Flags, NoFlags } from "./fiberFlags";

export class FiberNode {
    type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	ref: Ref | null;
	index: number;

    memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	deletions: FiberNode[] | null;

    constructor(tag: WorkTag, pendingProps: Props, key: Key){
        //实例属性
		this.tag = tag;
		this.key = key || null;
		//其对应的DOM
		this.stateNode = null;
		this.type = null;

        //构成树状结构
		//父级FiberNode
		this.return = null;
        //右边的兄弟FiberNode
		this.sibling = null;
		//子FiberNode
		this.child = null;
		//当前同级的位置索引
		this.index = 0;

		this.ref = null;

        //工作单元
		this.pendingProps = pendingProps;
		this.memoizedProps = null;
		this.updateQueue = null;
		this.memoizedState = null;

		this.alternate = null;
		//副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.deletions = null;
    }
}
