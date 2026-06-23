import { Component, JSX } from "solid-js";

interface ContainerProps {
  children: JSX.Element;
  class?: string;
}

const Container: Component<ContainerProps> = (props) => {
  return (
    <div class={`container-main ${props.class || ""}`}>{props.children}</div>
  );
};

export default Container;
