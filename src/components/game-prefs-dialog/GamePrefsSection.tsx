import * as React from 'react';

export interface IGamePrefsSectionProps {
  title: string,
  className?: string
}

export default class GamePrefsSection extends React.Component<IGamePrefsSectionProps, any> {
  public render() {
    const { title, children, className } = this.props;

    return (
      <div className={'gameprefs-popup__section ' + (className || '')}>
        <span className='gameprefs-popup__section-title'>{title}</span>
        {children}
      </div>
    );
  }
}
