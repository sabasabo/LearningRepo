import React from 'react';
import axios from 'axios';
import {connect} from "react-redux";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            author: ''
        };

        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value
        });
    }

    handleSubmit() {
        const {onSubmit, onEdit, articleToEdit} = this.props;
        const {title, body, author} = this.state;
        if (articleToEdit === undefined) {
            axios.post('http://localhost:443/api/Articles', {
                title,
                body,
                author
            }).then(res => onSubmit(res.data)).then(() => this.setState({
                title: '', body: '', author: ''
            })).catch(error => console.log(error));
        } else {
            axios.patch(`http://localhost:443/api/articles/${articleToEdit._id}`, {
                title,
                body,
                author
            }).then(res => onEdit(res.data)).then(() => this.setState(
                {title: '', body: '', author: ''})).catch(error => console.log(error));
        }
    }

    render() {
        const {articleToEdit} = this.props;

        const {title, body, author} = this.state;

        return (
            <div className='col-12 col-lg-6 offset-lg-3'>
                <input className='form-control my-3 '
                       placeholder={articleToEdit ? articleToEdit.title : 'Article Title'}
                       onChange={event => this.handleChangeField('title', event)}
                       value={title}/>
                <textarea className='form-control my-3'
                          placeholder={articleToEdit ? articleToEdit.body : 'Article Description'}
                          onChange={event => this.handleChangeField('body', event)}
                          value={body}/>
                <input className='form-control my-3'
                       placeholder={articleToEdit ? articleToEdit.author : 'Article Author'}
                       onChange={event => this.handleChangeField('author', event)}
                       value={author}/>
                <button className='btn btn-primary float-right'
                        onClick={this.handleSubmit}>{this.props.articleToEdit ? 'Edit' : 'Submit'}</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articleToEdit: state.home.articleToEdit
});

const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch({type: 'SUBMIT_ARTICLE', data}),
    onEdit: data => dispatch({type: 'EDIT_ARTICLE', data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);