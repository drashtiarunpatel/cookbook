import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import CommonModal from '../../components/UI/modal';
import Loader from '../../components/UI/loader';
import * as actionType from '../../js/actions';
// import RecipeImg from '../../images/Itemsrecept.png';
import './details.scss';

class Details extends Component {
    state = {
        showDeleteModal: false,
        showRatingModal: false,
        newRating: 0
    }
    handleModal = (modalName, value, newRating) => {
        this.setState({ [modalName]: value })
        if (newRating)
            this.setState({ newRating: newRating })
    }
    handleRatingConfirm = () => {
        this.props.addRating(this.props.ratingData, this.props.recipeDetail.id, this.state.newRating);
        this.handleModal("showRatingModal", false)
    }
    handleDeleteConfirm = () => {
        this.props.deleteRecipe(this.props.recipeDetail.id);
        this.handleModal("showDeleteModal", false);
    }
    render() {
        return (<>
            {Object.keys(this.props.recipeDetail).length ?
                <div className="details">
                    {this.props.loader ? <Loader /> : null}
                    <div className="header">
                        <h4>
                            <div className="row">
                                <div className="col-2 col-sm-2 col-md-4 header-back-btn">
                                    <NavLink to="/">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip className="back-btn-tooltip">Back to List</Tooltip>}>
                                            <Button type="button" variant="outline-info" className="back-btn" onClick={() => this.handleModal("showDeleteModal", true)}><i className="fas fa-arrow-left back-btn" /></Button>
                                        </OverlayTrigger>
                                    </NavLink>
                                </div>
                                <div className="col-9 col-sm-6 col-md-4 header-content">
                                    <div>{this.props.recipeDetail.name}</div>
                                    <div className="rating">
                                        <ReactStars
                                            className="rate-class"
                                            count={5}
                                            value={this.props.recipeDetail.score}
                                            size={25}
                                            edit={false}
                                            half={false}
                                            color2={'#ff00ff'} />
                                           &nbsp;
                                           <h6> <i className="far fa-clock"></i> {this.props.recipeDetail.duration} mins.
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4 detail-actions">
                                    <NavLink to="/add-edit" exact>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip className="back-btn-tooltip">
                                                Edit this recipe
                                                </Tooltip>}>
                                            <Button variant="outline-info" size="md" className="detail-action-btn" onClick={() => this.props.changeMode("edit")}>
                                                <i className="fa fa-edit" /> Edit
                                                </Button>
                                        </OverlayTrigger>
                                    </NavLink>
                                    &nbsp;
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip className="back-btn-tooltip">Delete this recipe</Tooltip>}>
                                        <Button type="button" variant="outline-info" className="detail-action-btn" onClick={() => this.handleModal("showDeleteModal", true)} >
                                            <i className="fa fa-trash-alt" /> Delete
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </h4>
                    </div>
                    <div className="content">
                        <h5 className="content-heading">Information</h5>
                        <div>{this.props.recipeDetail.info}</div>
                        <h5 className="content-heading">Ingredients</h5>
                        <ul>
                            {this.props.recipeDetail.ingredients && this.props.recipeDetail.ingredients.map((data, index) => (
                                <li key={"ingred-" + index}>{data}</li>
                            ))}
                        </ul>
                        <h5 className="content-heading">Procedure</h5>
                        <div className="proc" dangerouslySetInnerHTML={{ __html: this.props.recipeDetail.description }} />
                        <div className="rate">
                            Rate the recipe: &nbsp;
                        <ReactStars
                                className="rate-class"
                                count={5}
                                value={this.props.ratingData.find(data => data.id === this.props.recipeDetail.id) ? this.props.ratingData.find(data => data.id === this.props.recipeDetail.id).score : 0}
                                size={50}
                                half={false}
                                color1={'white'}
                                color2={'#ff00ff'}
                                edit={this.props.ratingData.find(data => data.id === this.props.recipeDetail.id) ? false : true}
                                onChange={(newRating) => this.handleModal("showRatingModal", true, newRating)} />
                        </div>
                    </div>
                </div >
                :
                <div className="details">
                    <div className="header">
                        <div className="no-data-div">
                            No Data Available!
                            <br />
                            <NavLink to="/">
                                <Button type="button" size="md" className="no-data-btn" variant="outline-info"> Go back </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            }
            <CommonModal
                showModal={this.state.showDeleteModal}
                modalTitle="Delete Recipe"
                modalBody="Are you sure you want to delete this recipe?"
                confirmBtnText="Okay"
                confirmBtnFunc={this.handleDeleteConfirm}
                cancelBtnText="Cancel"
                cancelBtnFunc={() => this.handleModal("showDeleteModal", false)}
            />
            <CommonModal
                showModal={this.state.showRatingModal}
                modalTitle="Submit Rating"
                modalBody="<h4>Do you want to submit this rating?</h4><p>Note: You can submit the rating only one time per recipe.<p>"
                confirmBtnText="Okay"
                confirmBtnFunc={this.handleRatingConfirm}
                cancelBtnText="Cancel"
                cancelBtnFunc={() => this.handleModal("showRatingModal", false)}
            />
            <CommonModal
                showModal={this.props.modalShow}
                navlink={this.props.modalNavlink}
                cancelBtnFunc={() => this.props.setModalParams(false, '')}
                modalBody={this.props.modalText}
                confirmBtnFunc={() => this.props.setModalParams(false, '')}
                confirmBtnText="Okay"
            />
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipeDetail: state.recipeDetail,
        ratingData: state.ratingData,
        modalShow: state.modalShow,
        modalText: state.modalText,
        modalNavlink: state.modalNavlink,
        loader: state.loader
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addRating: (ratingData, recipeId, rating) => dispatch(actionType.addRating(ratingData, recipeId, rating)),
        recipeRating: data => dispatch(actionType.recipeRating(data)),
        deleteRecipe: recipeId => dispatch(actionType.deleteRecipe(recipeId)),
        setModalParams: (modalShow, modalText) => dispatch(actionType.setModalParams(modalShow, modalText)),
        changeMode: mode => dispatch(actionType.changeMode(mode)),
        updateRecipe: (recipeId, data, recipeList) => dispatch(actionType.updateRecipe(recipeId, data, recipeList)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);