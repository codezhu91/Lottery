'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import mlux from 'mlux';
var Binder = mlux.Binder;
import SSQController  from './../../controller/SSQController'

var colorPair = {
    red: '#8f3800',
    blue: '#0166b3'
}

var titlePair = {
    red: '红球',
    blue: '篮球'
}
class Ball extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        var isSelected = this.props.isSelected;
        return (<TouchableOpacity
            onPress={() => this.props.onPress(this.props.text)}
            style={{
                height: 30,
                width: 30,
                backgroundColor: isSelected ? colorPair[type] : 'white',
                borderRadius: 100,
                marginRight: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}><Text style={{
                color: !isSelected ? colorPair[type] : 'white',
            }}>{this.props.number}</Text></TouchableOpacity>);
    }
}
class BaseBallSelector extends Component {
    constructor(...props) {
        super(...props);
        this.select = [];

    }
    toogleSelect(index) {
        let select = this.select;
        let i = select.indexOf(index);
        let count = this.props.type == 'red' ? 6 : 1;
        if (i >= 0) {
            //移除
            this.select = select.splice(i,1);
        } else if (select.length < count) {
            select.push(index);
        }
        this.forceUpdate();
        this.props.onSelect(this.select);
    }
    render() {
        var balls = [];
        var type = this.props.type;
        var count = type == 'red' ? 33 : 16;
        for (let i = 1; i <= count; i++) {
            balls.push(<Ball 
            type= {type} 
            key = {type+i}
            isSelected = {this.select.indexOf(i)>=0}
            number={SSQController.formatCode(i)} 
             onPress={(index) => {
                this.toogleSelect(index);
            } } />)
        }
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {balls}
            </View>);
    }
}
class RedBallSelector extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
        return <BaseBallSelector type = 'red' onSelect = {this.props.onSelect}/>
    }
}
class BlueBallSelector extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
         return <BaseBallSelector type = 'blue' onSelect = {this.props.onSelect}/>
    }
}
export default class BallSelector extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
        var type = this.props.type;

        return (
            <View style={{
                flexDirection: 'column'
            }}>
                <View>
                    <Text>{titlePair[type]}</Text>
                </View>
                {type=='red'&&<RedBallSelector />||<BlueBallSelector />}
            </View>)
    }

}