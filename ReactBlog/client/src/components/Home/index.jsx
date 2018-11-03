import React from 'react';
import axios from 'axios';

import {Form} from '../Article';
import {connect} from 'react-redux';
import moment from "moment";

class Home extends React.Component {
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        const {onLoad} = this.props;
        axios('http://localhost:8000/api/articles').then(res => onLoad(res.data)).catch(error => console.log(error));
    }

    handleDelete(id) {
        const {onDelete} = this.props;
        axios.delete(`http://localhost:8000/api/articles/${id}`).then(() => onDelete(id)).catch(error => console.log(error));
    }

    handleEdit(article) {
        const {setEdit} = this.props;
        setEdit(article);
    }

    render() {
        const {articles} = this.props;
        return (
            <div className="container">
                <div className="row pt-5">
                    <div className='col-12 col-lg-6 offset-lg-3'>
                        <h1 className='text-center'>LightBlog</h1>
                    </div>
                    <Form/>
                </div>
                <div className='row pt-5'>
                    <div className='col-12 col-lg-6 offset-lg-3'>
                        {(articles || []).map(article => {
                            return (
                                <div className='card my-3'>
                                    <div className='card-header'>
                                        {article.title}
                                    </div>
                                    <div className='card-body'>
                                        {article.body}
                                        <p className='mt-5 text-muted'>
                                            <p>By: <b>{article.author}</b></p>
                                            {moment(new Date(article.createdAt)).fromNow()}
                                        </p>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='row'>
                                            <button className='btn btn-primary mx-3' onClick={() => this.handleEdit(article)}>Edit</button>
                                            <button className='btn btn-danger' onClick={() => this.handleDelete(article._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.home.articles
});

const mapDispatchToProps = dispatch=> ({
    onLoad: data => dispatch({type: 'HOME_PAGE_LOADED', data}),
    onDelete: id => dispatch({type: 'DELETE_ARTICLE', id}),
    setEdit: article => dispatch({type: 'SET_EDIT', article})
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);