import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    centerPage:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    container: {
        padding: 16,
        alignSelf: 'stretch',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    formButton: {
        backgroundColor: 'black',
        padding: 8,
        marginBottom: 10,
    }
});

export default Styles;