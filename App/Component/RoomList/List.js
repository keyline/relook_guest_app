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

    return (
        <View style={styles.listContainer}>
            <View style={styles.listLeftContent}>
                <View style={styles.imageContainer}>
                    {(item?.room_images && item?.room_images.length > 0) ?
                        <View style={{ overflow: 'hidden' }}>
                            <Carousel
                                // ref={carouselRef}
                                data={item?.room_images}
                                renderItem={renderItem}
                                sliderWidth={150} // Adjust this according to your needs
                                itemWidth={150}
                                autoplay={true}            // Enable autoplay
                                autoplayInterval={3000}
                                loop={true}
                            />
                        </View>
                        :
                        <Image source={ImagePath.no_image} style={styles.noimage} />
                    }
                </View>
            </View>
            <View style={styles.listRightContent}>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 18 }]}>{item?.room_type_name}</Text>
                {(item.highlights && item.highlights.length > 0) && (
                    <>
                        {(item?.highlights).map((item, key) => (
                            <Text key={key} style={[CommonStyle.lightText, { fontSize: 12, color: Colors.grey }]}>{item} </Text>
                        ))}
                    </>
                )}
                <Text style={[CommonStyle.boldtext, { fontSize: 12, color: appData?.color_theme }]}>Price ₹ {item?.room_rent}/-</Text>
                <TouchableOpacity onPress={() => onPress(item)} disabled={!onPress} activeOpacity={0.5} style={[styles.listbtn, { borderColor: appData?.color_theme }]}>
                    <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 12 }]}>SELECT</Text>
                    <Image source={ImagePath.arrow_right} style={[styles.btnArrow, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDetails(item)} activeOpacity={0.5} style={styles.moreContainer}>
                    <Image source={ImagePath.more} style={[styles.moreimage, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default List