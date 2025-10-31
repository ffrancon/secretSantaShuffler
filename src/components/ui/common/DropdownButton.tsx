import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import { Activity, Fragment, useState, type ReactNode } from "react";

import { Button, type ButtonProps } from "./Button";

type Props = {
  children: ReactNode;
  buttonProps?: ButtonProps;
};

export const DropdownButton = ({ children, buttonProps }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <Fragment>
      <Button
        ref={refs.setReference}
        {...getReferenceProps()}
        {...buttonProps}
      />
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </Activity>
    </Fragment>
  );
};
