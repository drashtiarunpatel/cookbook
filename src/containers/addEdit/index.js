import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CommonModal from '../../components/UI/modal';
import Loader from '../../components/UI/loader';
import * as actionType from '../../js/actions';
import './addEdit.scss';

class addEdit extends Component {
    state = {
        name: '',
        description: '',
        ingredients: [""],
        duration: '',
        info: '',
        validated: false
    }
    componentDidMount() {
        if (this.props.mode === "edit")
            this.setState({ ...this.props.recipeDetail })
        else
            this.baseState = this.state;
    }
    addIngredient = () => {
        let ingredients = [...this.state.ingredients];
        ingredients.push("");
        this.setState({ ingredients: ingredients });
    }
    removeIngredient = (index) => {
        let ingredients = [...this.state.ingredients];
        ingredients.splice(index, 1);
        this.setState({ ingredients: ingredients });
    }
    handleChange = (e, index) => {
        if (e.target.id === "ingredients") {
            let ingredients = [...this.state.ingredients];
            ingredients[index] = e.target.value;
            this.setState({ ingredients: ingredients })
        }
        else { this.setState({ [e.target.id]: e.target.value }); }
    }
    handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            let data = { ...this.state };
            delete data.validated;
            data.duration = parseInt(data.duration);
            if (this.props.mode === "add")
                this.props.createNewRecipe(data, this.props.recipeList);
            else {
                delete data.id;
                this.props.updateRecipe(this.props.recipeDetail.id, data, this.props.recipeList);
            }
        }
        this.setState({ validated: true });
    }
    handleReset = () => {
        if (this.props.mode === "add")
            this.setState(this.baseState);
        else
            this.setState(this.props.recipeDetail)
    }
    render() {
        return (
            <div className="addEdit">
                {this.props.loader ? <Loader /> : null}
                <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated} className="addEdit-Form">
                    <div className="header">
                        <h4>
                            <div className="row">
                                <div className="col-2 col-sm-2 col-md-4 col-lg-4">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip>{this.props.mode === "add" ? "Back to List" : "Back to Detail"}</Tooltip>}>
                                        <NavLink to={this.props.mode === "add" ? "/" : "details"}>
                                            <Button type="submit" className="back-btn" variant="outline-info" size="md"><i className="fas fa-arrow-left back-btn" /></Button>
                                        </NavLink>
                                    </OverlayTrigger>
                                </div>
                                <div className="col-8 col-sm-4 col-md-4 col-lg-4 header-line">
                                    {this.props.mode === "add" ? "Add Recipe" : "Edit Recipe"}
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-4 action-btns">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip>Reset all fields</Tooltip>}>
                                        <Button type="reset" className="add-btn" variant="outline-info" size="md" onClick={this.handleReset}>
                                            <i className="fa fa-redo" /> Reset
                                            </Button>
                                    </OverlayTrigger>
                                    &nbsp;
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip>Click to {this.props.mode === "add" ? "save" : "update"} recipe</Tooltip>}>
                                        {this.props.mode === "add" ?
                                            <Button type="submit" className="add-btn" variant="outline-info" size="md">
                                                <i className="fa fa-plus" /> Save
                                            </Button>
                                            :
                                            <Button type="submit" className="add-btn" variant="outline-info" size="md">
                                                <i className="fa fa-sync-alt" /> Update
                                            </Button>
                                        }
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </h4>
                    </div>
                    <Form.Group controlId="name" as={Row}>
                        <Form.Label column sm={12} md={2}>Recipe Name</Form.Label>
                        <Col sm={12} md={10}>
                            <Form.Control value={this.state.name} isInvalid={this.state.name !== '' && !this.state.name.toLowerCase().split(' ').includes('ackee')} required type="text" onChange={this.handleChange} placeholder="Enter name of recipe containing word 'Ackee'" />
                            <Form.Control.Feedback type="invalid">
                                Recipe Name cannot be empty and should contain word 'Ackee'.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="info" as={Row}>
                        <Form.Label column sm={12} md={2}>Info</Form.Label>
                        <Col sm={12} md={10}>
                            <Form.Control required type="text" value={this.state.info} onChange={this.handleChange} placeholder="Enter some information in short" />
                            <Form.Control.Feedback type="invalid">
                                Info cannot be empty.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="ingredients" as={Row}>
                        <Form.Label column sm={12} md={2}>Ingredients</Form.Label>
                        <Col sm={12} md={10}>
                            {this.state.ingredients.map((data, index) => (
                                <InputGroup key={"ingred-" + index}>
                                    <Form.Control required value={data} type="text" onChange={(e) => this.handleChange(e, index)} placeholder="Enter name and quantity of ingredient" />
                                    {
                                        this.state.ingredients.length !== 1 &&
                                        <InputGroup.Append>
                                            <InputGroup.Text onClick={() => this.removeIngredient(index)} className="remove-ingred-btn">
                                                <i className="fa fa-trash-alt" /> Remove
                                                </InputGroup.Text>
                                        </InputGroup.Append>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Need to add at least one ingredient.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            ))}
                            <Button type="button" variant="outline-info" onClick={this.addIngredient} className="addIngred-btn"><i className="fa fa-plus" /> Add More Ingredients</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="description" as={Row}>
                        <Form.Label column sm={12} md={2}>Procedure</Form.Label>
                        <Col sm={12} md={10}>
                            <Form.Control required as="textarea" rows="4" value={this.state.description} onChange={this.handleChange} placeholder="Enter procedure of recipe" />
                            <Form.Control.Feedback type="invalid">
                                Procedure cannot be empty.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="duration" as={Row}>
                        <Form.Label column sm={12} md={2}>Duration</Form.Label>
                        <Col sm={6} md={5}>
                            <InputGroup>
                                <Form.Control required min={1} type="number" isInvalid={parseInt(this.state.duration) <= 0} value={this.state.duration} onChange={this.handleChange} placeholder="Enter duration in minutes" />
                                <InputGroup.Append>
                                    <InputGroup.Text>(in minutes)</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control.Feedback type="invalid">
                                    Duration should be greater than 0
                            </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Form>
                <CommonModal
                    showModal={this.props.modalShow}
                    modalBody={this.props.modalText}
                    cancelBtnFunc={() => this.props.setModalParams(false, '')}
                    cancelBtnText="Close"
                    navlink={this.props.modalNavlink}
                />
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        recipeList: state.recipeList,
        modalShow: state.modalShow,
        modalText: state.modalText,
        modalNavlink: state.modalNavlink,
        mode: state.addEditMode,
        recipeDetail: state.recipeDetail,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewRecipe: (data, recipeList) => dispatch(actionType.createNewRecipe(data, recipeList)),
        setModalParams: (modalShow, modalText) => dispatch(actionType.setModalParams(modalShow, modalText)),
        updateRecipe: (recipeId, data, recipeList) => dispatch(actionType.updateRecipe(recipeId, data, recipeList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addEdit);