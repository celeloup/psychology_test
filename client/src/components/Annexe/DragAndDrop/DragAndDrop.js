import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { withRouter } from 'react-router';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `5px 0`,
    fontWeight: `500`,
    borderRadius: 3,
    border: '2px solid rgba(0, 114, 214, 0.8)',

    background: isDragging ? 'rgba(0, 114, 214, 0.3)' : 'white',

    ...draggableStyle
});

const getItemStyleSelected = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `5px 0`,
    color: 'white',
    fontWeight: `500`,
    borderRadius: 3,
    
    background: isDragging ? 'rgba(0, 114, 214, 0.3)' : 'rgba(0, 114, 214, 0.6)',
    "--showBefore": isDragging ? 'hidden' : 'visible',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'rgba(0, 114, 214, 0.3)' : 'white',
    padding: `0 5px`,
    borderRadius: `5px 0 0 5px`,
    width: 250 ,
    // minHeight: 320
});

const getListStyleSelected = isDraggingOver => ({
    background: isDraggingOver ? 'rgba(0, 114, 214, 0.3)' : 'white',
    padding: `0 5px 0 8px`,
    borderRadius: `0 5px 5px 0`,
    // border: `3px solid rgba(0, 114, 214, 0.6)`,
    width: 250 ,
    // minHeight: 320
});

export class DragAndDrop extends Component {
    state = {
		items: [
			{id:"0", content:"Se protéger soi-même"},
			{id:"1", content:"Protéger sa famille"},
			{id:"2", content:"Protéger les autres"},
			{id:"3", content:"Combattre l'épidémie"},
            {id:"4", content:"Pour ne pas avoir d'amendes"},
            {id:"5", content:"Par rapport au regard des autres"},
			{id:"6", content:"Autre (précisez ci-dessous)"}
		],
		selected: []
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    handleChange = (selected) => {
        var new_list = [];
        for (var i = 0; i < selected.length; i++)
            new_list.push(selected[i].content);
        this.props.onChangeRaison(new_list);
    }

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        // DROP DANS LA MEME = REORDER
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }
            this.handleChange(items);
            this.setState(state);
        } else { // DROP DANS DIFFERENT
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
            this.handleChange(result.droppable2);
        }
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
							id="drag_drop_options"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                            <i className="fas fa-grip-vertical"></i>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {this.state.items.length === 0 &&
                                <span id="empty_items_div">
                                    <i className="fas fa-ghost"></i>
                                    Vide
                                </span>
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
                <Droppable droppableId="droppable2">
                    
                    {(provided, snapshot) => (
                        <div
                            id="drag_drop_selected"
                            ref={provided.innerRef}
                            style={getListStyleSelected(snapshot.isDraggingOver)}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            number={index + 1}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyleSelected(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                            className={snapshot.isDragging ? '' : 'showBefore'}>
                                            {item.content}
                                            <i className="fas fa-grip-vertical"></i>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {this.state.selected.length === 0 &&
                                <span id="empty_selected_div">
                                    <i className="fas fa-arrow-circle-down"></i>
                                    Déposez vos réponses ici
                                </span>
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
