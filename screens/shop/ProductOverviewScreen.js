import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as cartAction from '../../store/actions/cart';
import CartButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

const ProductOverviewScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.availableProducts);

    return (
        <FlatList 
            data={ products }
            keyExtractor={ item => item.id }
            renderItem={ itemData => {
                return (
                    <ProductItem 
                        title={ itemData.item.title }
                        price={ itemData.item.price }
                        image={ itemData.item.imageUrl }
                        onViewDetails={ () => {
                            props.navigation.navigate({ 
                                routeName: 'ProductDetail', 
                                params: {
                                    productId: itemData.item.id,
                                    productTitle: itemData.item.title
                                }
                            });
                        } }
                        onAddToCart={ () => {
                            // Dispatch add cart action
                            dispatch(cartAction.addCart(itemData.item));
                        } }
                    />
                )
            }}
        />
    );
};

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ CartButton }>
                <Item 
                    title="Cart" 
                    onPress={ () => navData.navigation.navigate('Cart') }
                    iconName={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' } 
                />
            </HeaderButtons>
        )
    };
};

export default ProductOverviewScreen;