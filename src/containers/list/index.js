import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import * as actionType from '../../js/actions';
import Loader from '../../components/UI/loader';
import ItemsRecept from '../../images/Itemsrecept.png';

import './list.scss';

class List extends Component {
    state = {
        offset: 0,
        recipeListCopy: []
    }
    componentDidMount() {
        this.props.getRecipeList(0, []);
    }
    handleMoreBtn = () => {
        this.props.getRecipeList(this.state.offset + 10, this.props.recipeList)
        this.setState({ offset: this.state.offset + 10, recipeListCopy: this.props.recipeList });
    }
    render() {
        return (
            <div className="list">
                {this.props.loader ? <Loader /> : null}
                <div className="list-header">
                    <h4>
                        <div className="row">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                Recipes
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                <NavLink to="add-edit">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip>Click to add new recipe</Tooltip>}>
                                        <Button className="add-btn" variant="outline-info" size="md" onClick={() => this.props.changeMode("add")}>
                                            <i className="fa fa-plus" /> Add New
                                        </Button>
                                    </OverlayTrigger>
                                </NavLink>
                            </div>
                        </div>
                    </h4>
                </div>
                <div className="row list-items">
                    {this.props.recipeList && this.props.recipeList.map(data => (
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 list-item" key={data.id} onClick={() => this.props.getRecipe(data.id)}>
                            <NavLink to="details" className="list-item-link">
                                <div className="row">
                                    <div className="col-4 col-sm-4 col-md-4 list-item-content">
                                        <img src={ItemsRecept} alt="" />
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 width-min-content">
                                        {data.name}
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={data.score}
                                            edit={false}
                                            half={false}
                                            color2={'#ff00ff'} />
                                        <i className="far fa-clock"></i> {data.duration} mins.
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
                {this.state.recipeListCopy.length !== this.props.recipeList.length &&
                    <div className="showMore">
                        <Button className="showMore-btn" variant="outline-info" onClick={this.handleMoreBtn}>Show More!</Button>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipeList: state.recipeList,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipeList: (offset, recipeList) => dispatch(actionType.getRecipeList(offset, recipeList)),
        getRecipe: (id) => dispatch(actionType.getRecipe(id)),
        changeMode: mode => dispatch(actionType.changeMode(mode))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);