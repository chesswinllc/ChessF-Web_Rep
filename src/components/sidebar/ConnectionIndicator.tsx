import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxStore } from 'src/redux';

export interface IConnectionIndicatorProps {
    connectionId: string
}

const ConnectionIndicator = class extends React.Component<IConnectionIndicatorProps, any> {
    public render() {

        const { connectionId } = this.props;

        const className = connectionId ? 'sidebar__connection-indicator--on' : 'sidebar__connection-indicator--off';

        return (
            <div className={'sidebar__connection-indicator ' + className}>

            </div>
        );
    }
}


const mapPropsToState = (state: IReduxStore) => {
    return {
        connectionId: state.connectionId
    }
}


export default connect(mapPropsToState)(ConnectionIndicator);