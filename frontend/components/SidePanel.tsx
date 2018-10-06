import React, { ReactNode } from "react";
import Sidebar from "react-sidebar";
import SidebarMenu from "./SidebarMenu";
 
interface IWithSidebar {
   sidebar: ReactNode,
   open: boolean,
   onSetOpen:(open: boolean) => void
 }

type SidePanelState = Record<"mql",MediaQueryList> & Record<"dockModeAvailable",boolean> 


 
class SidePanel extends React.Component<IWithSidebar,SidePanelState> {
  constructor(props) {
    super(props);
    this.state = {
      dockModeAvailable: false,
      mql: null
    };
  }
  componentDidMount()  {
    const mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql: mql,
      dockModeAvailable: mql.matches
    });
  }

 
  componentWillUnmount = ()=> {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
 
  mediaQueryChanged=() => {
    this.setState(state=>({ dockModeAvailable: state.mql.matches }));
  }
 
  

  render = () =>{
    const panel = (<div>
      <SidebarMenu onClose={()=>this.props.onSetOpen(false)}/>
       <div style={{height:'100vh', overflow:'auto'}}>{this.props.sidebar}
       </div>
      </div>
    )
    
    return (
        <Sidebar
          sidebar={panel}
          open={this.props.open}
          docked={this.state.dockModeAvailable && this.props.open}
          onSetOpen={this.props.onSetOpen}
          styles={{ sidebar: { background: 'whitesmoke' } }}
        >
             {this.props.children}
           

        </Sidebar>)
    
  }
}
 
export default SidePanel;

