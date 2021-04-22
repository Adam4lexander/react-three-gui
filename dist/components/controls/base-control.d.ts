declare type BaseControlProps = {
    label?: string;
    flexLabel?: boolean;
    value?: string;
    children?: any;
    stack?: boolean;
    htmlFor?: any;
};
export declare function BaseControl({ htmlFor, label, flexLabel, value, stack, children, }: BaseControlProps): JSX.Element;
export {};
