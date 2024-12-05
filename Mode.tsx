import react ,{ useState } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    useColorScheme 
} from 'react-native';

function Mode() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark"
    return(
        <View style={isDark ? styles.dark : styles.light }>
            <Text  style={isDark ? styles.darkText : styles.lightText }>Hello!</Text>
        </View>
    )

    
}

const styles = StyleSheet.create({
    dark:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
    },
    darkText:{
       color:"black" 
    },
    lightText:{
        color:"white" 
     },
    light:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'black',

    }
})


export default Mode;