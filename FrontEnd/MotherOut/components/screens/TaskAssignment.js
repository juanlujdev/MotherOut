import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, View,} from 'react-native';
import {Image,} from 'react-native-elements';
import {GenericIconButton} from '../GenericIconButton';
import {NavBar} from '../NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let Image_Http_URL = {uri: 'https://i.imgur.com/0uFZU2k.png?1'};

class TaskAssignment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
    }

    componentDidMount = () => {
        // alert(this.props.route.params.user);
        this.getData().then(
            () => {
                console.log(this.state.user);
            });
    };
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser');
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be loaded.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    };
    randomTask = async () => {
        axios.put('http://52.0.146.162:80/api/UserTasks?idTeam=' + this.state.user.AsignedTeam);
        this.props.navigation.navigate('AsignedTask');
    };

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 333, height: 90}}
                                source={Image_Http_URL}
                            />
                        </View>
                    </View>
                    <View style={styles.body}>
                        <GenericIconButton
                            button="MANUAL ASSIGNMENT"
                            icon='wrench'
                            press={() => this.props.navigation.navigate('ManualAssignment')}
                        />
                        <GenericIconButton
                            button="RANDOM ASSIGNMENT"
                            icon='random'
                            press={() => this.randomTask()}
                        />
                    </View>
                    <NavBar
                        checked={() => this.props.navigation.navigate('ScreenToDo')}
                        list={() => this.props.navigation.navigate('ListTask')}
                        calendar={() => this.props.navigation.navigate('TaskAssignment')}
                        nav={() => this.props.navigation.navigate('Statistics')}
                        settings={() => this.props.navigation.navigate('Setting')}
                    />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#90A8C3',
        borderWidth: 2,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,

    },
    StyleText: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 10,
    },
    button1: {
        marginBottom: 1,
    },
    button2: {
        marginTop: 1,
    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    },
});

export default TaskAssignment;
