import { Fragment } from "react";
import SimpleSidebar from "./chakra_nav";

interface ParentCompProps {
  childComp?: React.ReactNode;
}

const Layout: React.FC<ParentCompProps> = (props) => {
  return (
    <Fragment>
      <SimpleSidebar children={props.children} />
    </Fragment>
  );
};

export default Layout;
