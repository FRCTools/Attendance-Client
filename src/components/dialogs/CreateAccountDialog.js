import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class Leaderboard extends Component {
    constructor() {
        super();

        this.state = { name: '', mentor: false };
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress.bind(this));
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && this.props.open) {
            this.handleSubmit.bind(this)();
        }
    }

    handleSubmit() {
        // Verify that the user has entered a name
        if (this.state.name !== '') {
            this.props.handleSubmit(this.props.studentId, this.state.name, this.state.mentor);
            this.setState({ name: '', mentor: false });
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.props.handleClose} />,
            <FlatButton
                label="Okay"
                primary={true}
                onClick={this.handleSubmit.bind(this)} />
        ];

        return (
            <Dialog
                title="Create Account"
                actions={actions}
                modal={true}
                open={this.props.open}
                onRequestClose={this.props.handleClose}>
                <TextField
                    style={{ maxWidth: '250px' }}
                    value={this.state.name}
                    ref="name"
                    onChange={ (e) => this.setState({ name: e.target.value }) }
                    autoFocus={true}
                    hintText="Jane Doe"
                    floatingLabelText="Full Name" />
                <Toggle
                    style={{ maxWidth: '125px' }}
                    toggled={this.state.mentor}
                    onToggle={ (e, toggled) => this.setState({ mentor: toggled }) }
                    label="Mentor" />
            </Dialog>
        );
    }
}

export default Leaderboard;
