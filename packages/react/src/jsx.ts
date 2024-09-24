import { REACT_ELEMENT_TYPE } from "share/ReactSymbols";
import {
  Type,
  Key,
  Ref,
  Props,
  ELementType,
  ReactElementType,
} from "share/ReactTypes";

//实现ReactElement构造函数

const ReactElement = function (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    key,
    ref,
    props,
    type,
    _mark: "ju",
  };
  return element;
};

export const jsx = (type: ELementType, config: any, ...children: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = val + '';
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		//判断剩下的props是否是config上的，而不是原型上的
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const childrenLength = children.length;
	if (childrenLength) {
		//有一个或多个child
		if (childrenLength === 1) {
			props.children = children[0];
		} else {
			props.children = children;
		}
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ELementType, config: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = val + '';
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		//判断剩下的props是否是config上的，而不是原型上的
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};
