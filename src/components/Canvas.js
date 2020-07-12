import React from 'react';
import createEngine, {  
    DefaultNodeModel,
    DiagramModel 
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

export default class Canvas extends React.Component {
    constructor (props) {
        super (props);
        this.state = {

        }
        this.engine = createEngine();
        this.model = new DiagramModel();

        let node1 = new DefaultNodeModel();
        node1.setPosition(100, 100);
        let port1 = node1.addOutPort('Out');
        let node2 = new DefaultNodeModel();
        node2.setPosition(200,200);
        let port2 = node2.addOutPort('Out');

        let link = port1.link(port2);
        this.model.addAll(node1,node2,link);
        this.engine.setModel(this.model);
    }

    render = () => {
        return (
            <CanvasWidget className="diagram-container" engine={this.engine}/>
        )
    }

}