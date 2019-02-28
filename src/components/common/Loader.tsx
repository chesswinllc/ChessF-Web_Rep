import * as React from 'react';

export interface ILoaderProps {
    width?: number,
    height?: number,
    borderWidth?: number,
    color?: string
}

export default class Loader extends React.Component<ILoaderProps, any> {
    public render() {
        let { width, height, borderWidth, color } = this.props;

        width = width ? width : 60
        height = height ? height : 60
        borderWidth = borderWidth ? borderWidth : 2.5;
        color = color ? color : 'white';
        color += ' transparent transparent transparent';

        return (
            <div style={{ width, height }} className="lds-ring">
                <div style={{ borderWidth, borderColor: color }} ></div>
                <div style={{ borderWidth, borderColor: color }} ></div>
                <div style={{ borderWidth, borderColor: color }} ></div>
                <div style={{ borderWidth, borderColor: color }} ></div>
            </div>
        );
    }
}
