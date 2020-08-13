import React from 'react';
import createEngine, {  
    DefaultNodeModel,
    DiagramModel 
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

export default class Canvas extends React.Component {
    constructor (props) {
        super (props);

        this.engine = createEngine();
        this.model = this.generateNewModel();

        let node1 = new DefaultNodeModel();
        node1.setPosition(0, 0);
        let port1 = node1.addOutPort('Out');
        let node2 = new DefaultNodeModel();
        node2.setPosition(250,250);
        let port2 = node2.addOutPort('Out');

        let link = port1.link(port2);
        this.model.addAll(node1,node2,link);
        this.engine.setModel(this.model);
    }

    generateNewModel = () => {
        let newModel = new DiagramModel();
        newModel.setGridSize(250);
        newModel.registerListener({
            offsetUpdated: (e) => this.handleOffsetUpdate(e),
            zoomUpdated: (e) => this.handleZoomUpdate(e),
        })
        return newModel;
    }

    handleOffsetUpdate = () => {
        let offsetX = this.model.getOffsetX();
        let offsetY = this.model.getOffsetY();
        let container = document.getElementById("dcontainer");
        container.style.setProperty('--offset-x', `${offsetX}px`)
        container.style.setProperty('--offset-y', `${offsetY}px`);
    }

    handleZoomUpdate = (e) => {
        let gridSize = this.model.options.gridSize;
        let zoomLevel = this.model.getZoomLevel();
        let container = document.getElementById("dcontainer");
        container.style.setProperty('--grid-size', `${(gridSize * zoomLevel) / 100}px`)
    }

    render = () => {
        return (
            <div id="dcontainer">
                <CanvasWidget className="diagram-container" engine={this.engine}/>
            </div>
        )
    }

}