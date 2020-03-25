var MyContainer = React.createClass({
    render: function(){
        return(
            <Intermediate text="where is my son?" />
        );
    }
});

var Intermediate = React.createClass({
    render: function(){
        return(
            <Child text={this.props.text}/>
        );
    }
});

var Child = React.createClass({
    render: function(){
        return(
            <span>{this.props.text}</span>
        );
    }
});

var MyContainer = React.createClass({
    getInitialState: function(){
        return{
            checked:false
        };
    },
    onChildChanged: function(){
        this.setState({
            checked:newState
        });
    },
    render: function(){
        var isChecked = this.state.checked ? 'yes' : 'no';
        return(
            <div>
                <div>Are you checked: {isChecked}</div>
                <ToggleButton text="Toggle me"
                    initialChecked={this.state.checked}
                    callbackParent={this.onChildChanged}
                />
            </div>
        )
    }
})

var ToggleButton = React.createClass({
    getInitialState: function(){
        return{
            checked: this.props.initialChecked
        };
    },
    onTextChange: function(){
        var newState = !this.state.checked;
        this.setState({
            checked:newState
        });
        this.props.callbackParent(newState);
    },
    render: function(){
        var text = this.props.text;
        var checked = this.state.checked;

        return(
            <label>{text}: <input type="checkbox" checked={checked}                 onChange={this.onTextChange} /></label>
        );
    }
})
