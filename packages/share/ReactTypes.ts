export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ELementType = any;

export interface ReactElementType {
    $$typeof: symbol | number;
    type: ELementType;
    key: Key;
    props: Props;
    ref: Ref;
    _mark: string;
}

export type Action<State> = State | ((prevState: State) => State);