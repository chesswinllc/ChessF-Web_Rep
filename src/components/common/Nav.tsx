import * as React from 'react';

export interface INavProps {
}

export default class Nav extends React.Component<INavProps, any> {
    public render() {
        return (
            <div className='nav'>
                {this.props.children}
            </div>
        );
    }
}
