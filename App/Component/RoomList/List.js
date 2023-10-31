import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'
import { ImagePath } from '../../Utils/ImagePath'
import Carousel from 'react-native-snap-carousel';

const image = [
    { id: 1, img: ImagePath.room1 },
    { id: 2, img: ImagePath.room2 },
    { id: 3, img: ImagePath.room1 },
    { id: 4, img: ImagePath.room2 },
]
const screenWidth = Dimensions.get('window').width;

const List = ({ item, onPress, onDetails }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const renderItem = ({ item, index }) => {
        return (
            <Image
                source={{ uri: item }}
                style={styles.img}
            />
        );
    };

    const autoScroll = () => {
        const newIndex = (activeIndex + 1) % item?.room_images.length;
        setActiveIndex(newIndex);
        carouselRef.current.snapToItem(newIndex);
    };

    useEffect(() => {
        // Start auto-scrolling when the component mounts
        const scrollInterval = setInterval(autoScroll, 3000); // Change the interval as needed

        return () => {
            // Clear the interval when the component unmounts
            clearInterval(scrollInterval);
        };
    }, [activeIndex]);

    return (
        <View style={styles.listContainer}>
            <View style={styles.listHeading}>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 18 }]}>{item.room_type_name}</Text>
                <Text onPress={() => onDetails(item)} style={[CommonStyle.boldtext, { color: appData?.color_complete_button, textDecorationLine: 'underline' }]}>More Info</Text>
            </View>
            {/* <Image
                source={{ uri: item?.room_image }}
                style={styles.img}
            /> */}
            {(item?.room_images && item?.room_images.length > 0) && (
                <View style={{ overflow: 'hidden' }}>
                    <Carousel
                        ref={carouselRef}
                        data={item?.room_images}
                        renderItem={renderItem}
                        sliderWidth={screenWidth} // Adjust this according to your needs
                        itemWidth={screenWidth}
                    />
                </View>
            )}
            <View style={styles.featureContent}>
                {(item?.highlights).map((item, key) => (
                    <Text key={key} style={CommonStyle.boldtextgrey}>{item} </Text>
                ))}
                {/* <Text style={CommonStyle.boldtextgrey}>Up to 3* Guests</Text>
                <Text style={CommonStyle.boldtextgrey}>King Bed</Text> */}
            </View>
            <View style={styles.bordernew} />
            <View style={styles.btnContent}>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16, marginTop: '1%' }]}>Price : Rs.{item.room_rent}/-</Text>
                <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.5} style={[styles.bookbtn, { backgroundColor: appData?.color_theme }]}>
                    <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default List