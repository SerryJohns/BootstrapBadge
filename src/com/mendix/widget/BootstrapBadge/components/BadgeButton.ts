import { BadgeProps } from "./BadgeComponent";
import { DOM } from "react";

export const ButtonBadgeItem = (props: BadgeProps) =>
    DOM.button(
        {
            className: props.className,
            onClick: () => onClickMF(props)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: "badge" }, props.badgeValue)
    );

const onClickMF = (props: BadgeProps) => {
    if (props.MicroflowProps && props.MicroflowProps.microflow && props.MicroflowProps.guid) {
        window.mx.data.action({
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing MicroFlow:
                ${ props.MicroflowProps.microflow }: ${ error.message }`);
            },
            params: {
                actionname: props.MicroflowProps.microflow,
                applyto: "selection",
                guids: [ props.MicroflowProps.guid ]
            }
        });
    }
};
