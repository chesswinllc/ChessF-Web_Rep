import * as React from 'react';


interface IDropDownProps {
    items: any[],
    renderItem: (item: any) => any,
    className?: string
}

export default function (props: IDropDownProps) {

    return (
        <div className={'dropdown ' + (props.className || '')}>
            {props.items.map((item, i) => {
                return props.renderItem(item);
            })}
        </div>
    )

}
