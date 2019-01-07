import React, {Component} from "react";
import {FaEdit, FaMinus, FaPlus} from "react-icons/fa/index";
import PropTypes from "prop-types";
import _ from "lodash";

const EMISSIONEMPTY = {
    name: "",
    categories: [],
    contenu: "",
    image: "",
    link: "",
    datetime: "",
    id: '',
};

export default class EmissionForm extends Component {
    static propTypes = {
        editEmission: PropTypes.object,
        handleSubmit: PropTypes.func,
        handleDelete: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            emission: EMISSIONEMPTY,
            isEdit: false,
        };

        if (!_.isEmpty(this.props.editEmission)) {
            this.state = {
                emission: this.props.editEmission,
                isEdit: true,
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.emission);
        this.setState({
            emission: EMISSIONEMPTY,
            isEdit: false,
        });
    }

    componentDidUpdate() {
        if (!_.isEmpty(this.props.editEmission) && this.props.editEmission.id !== this.state.emission.id) {
            this.setState({
                emission: this.props.editEmission,
                isEdit: true,
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(target.type === 'select-multiple') {
            let options = target.options;
            value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
        }

        let curValue = this.state.emission;
        curValue[name] = value;
        this.setState({
            emission: curValue
        });
    }

    handleDelete(event) {
        event.preventDefault();
        let id = this.state.emission.id;
        this.props.handleDelete(id);
        this.setState({
            emission: EMISSIONEMPTY,
            isEdit: false,
        });
    }

    render() {
        let categoriesArray = this.props.categories;
        let curEmission = this.state.emission;
        return (
            <form
                className="EmissionAdminComponent__form form"
                onSubmit={this.handleSubmit}
            >
                <legend>Ajouter une émission</legend>

                <div className="field">
                    <label className="label">Catégories</label>
                    <div className="control">
                        <select
                            multiple
                            name="categories"
                            className={'input input--select'}
                            value={curEmission.categories}
                            onChange={this.handleChange}
                        >
                            {Object.keys(categoriesArray).map(function(key) {
                                return (
                                    <option
                                        key={key}
                                        value={categoriesArray[key].id}
                                    >
                                        {categoriesArray[key].name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Nom</label>
                    <div className="control">
                            <input
                                type="text"
                                className={'input'}
                                name="name"
                                placeholder={"Nom"}
                                value={curEmission.name}
                                onChange={this.handleChange}
                            />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                            <input
                                type="datetime-local"
                                name="datetime"
                                className={'input'}
                                placeholder={"Date"}
                                value={curEmission.datetime}
                                onChange={this.handleChange}
                            />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Contenu</label>
                    <div className="control">
                        <textarea
                            className={'textarea'}
                            name="contenu"
                            placeholder={"Contenu"}
                            value={curEmission.contenu}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input
                            type="text"
                            className={'input'}
                            name="image"
                            placeholder={"Image"}
                            value={curEmission.image}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Link</label>
                    <div className="control">
                        <input
                            type="text"
                            className={'input'}
                            name="link"
                            placeholder={"Link"}
                            value={curEmission.link}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                {
                    this.state.isEdit ? (
                        <button
                            className={'button is-danger'}
                            onClick={this.handleDelete}
                        >
                            <FaMinus />
                        </button>
                    ) : ''
                }
                <button
                    className={'button is-info is-big'}
                    type="submit"
                >
                    {this.state.isEdit ? <FaEdit/> : <FaPlus/>}
                </button>
            </form>
        );
    }
}
