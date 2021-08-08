import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
        isModalOpen: false
    };

    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return(
        <div>
            <Button onClick={this.toggleModal} outline> 
                <span className="fa fa-pencil fa-lg" />
                Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                                <Control.select model=".rating" id="rating" name="rating"
                                                    placeholder="Rating"
                                                    className="form-control">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                </Control.select>
                                    </div>


                                    <div className="form-group">
                                        <Label htmlFor="name">Your Name</Label>
                                            <Control.text model=".yourName" id="yourName" name="yourName"
                                                placeholder="Your Name"
                                                className="form-control"
                                                    validators={{
                                                        minLength: minLength(2), 
                                                        maxLength: maxLength(15)
                                                    }}
                                            />
                                            <Errors
                                    className="text-danger"
                                    model=".yourName"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters or more',
                                        maxLength: 'Must be 15 characters or fewer'
                                    }}
                                    />
                                    </div>


                                    <div className="form-group">
                                        <Label htmlFor="comments">Comments</Label>
                                            <Control.textarea model=".comments" id="comments" name="comments" rows="6"
                                                className="form-control"
                                            />
                                    </div>
                                    
                                    <div>
                                    <Button type="submit" className="btn btn-info">
                                        Submit
                                        </Button>
                                    </div>
                        </LocalForm>
                </ModalBody>
            </Modal>
        </div>


        );
    }
}

    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
        
    }

    function RenderComments({comments}) {
        if(comments) {
            return(
                <div className="col-md-5 m1">
                    <h4>Comments</h4>
                    {
                    comments.map( comment => {
                        return (
                            <div key={comment.id}>
                                <p>
                            {comment.text} <br /> 
                            
                            {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                                </div>
                                )
                    })  
                    }
                    <CommentForm />
                </div>
            )
        } else {
            return (
                <div />)
        }
    }

function CampsiteInfo(props)    {
        if (props.campsite) {
            return (
            <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>);
        } else {
            return<div></div>
        }
    }


export default CampsiteInfo;