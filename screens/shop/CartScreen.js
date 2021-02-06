import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import Colors from '../../constants/Colors';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const allCartItems = [];

        for (let key in state.cart.items) {
            allCartItems.push({
                productId: key,
                quantity: state.cart.items[key].quantity,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                sum: state.cart.items[key].sum
            });
        };

        return allCartItems; 
    });

    return (
        <View style={ styles.screen }>
            <View style={ styles.summary }>
                <Text style={ styles.summaryText }>
                    Total: <Text style={ styles.amount }>$ { cartTotalAmount.toFixed(2) }</Text>
                </Text>
                <Button 
                    title="Order Now" 
                    onPress={ () => {} } 
                    color={ Colors.accent } 
                    disabled={ cartItems.length <= 0 }
                />
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;