import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';


function DraggableColorList(props){
    const { colors, removeColor } = props;
    return (
        <div style={{height: '100%'}}>
            {colors.map((color, i) => {
                return  <DraggableColorBox 
                        index={i}
                        color={color.color} 
                        removeColor={() => removeColor(color.name)} 
                        name={color.name}
                        key={color.name}
                 />
            })}
        </div>
    )
}

export default SortableContainer(DraggableColorList);