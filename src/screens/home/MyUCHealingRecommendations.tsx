import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import React, { useState } from 'react';
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native-ui-lib";
import useContentful from "../../hooks/useContentful";

const contentFulToReactNative = {
    renderMark: {
        [MARKS.UNDERLINE]: (text) => {
            return text;
        },
        [MARKS.BOLD]: (text) => {
            return <Text style={{
                fontSize: 16, fontFamily: 'Poppins-SemiBold',
                color: "#020202", width: "100%"
            }}>{text}</Text>;
        },
        [MARKS.ITALIC]: (text) => {
            return <Text style={{
                fontSize: 20, fontFamily: 'Poppins-Italic',
                color: "#020202", width: "100%"
            }}>{text}</Text>;
        },
        [MARKS.CODE]: (text) => {
            return <Text>{text}</Text>;
        },
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_node, children) => {
            return <Text style={{
                margin: 5,
                fontSize: 15, fontFamily: 'Poppins-Regular',
                color: "#020202", width: "100%"
            }}>{children}</Text>;
        },
        [BLOCKS.HEADING_1]: (_node, children) => <Text style={{
            fontSize: 25, fontFamily: 'Neuton-Bold', fontWeight: "700",
            color: "#020202", width: "100%"
        }}>{children}</Text>,
        [BLOCKS.HEADING_2]: (_node, children) => <Text style={{
            marginTop: 20, marginBottom: 15,
            fontSize: 26, fontFamily: 'Neuton-Regular', fontWeight: "400",
            color: "#020202", width: "100%"
        }}>{children}</Text>,
        [BLOCKS.HEADING_3]: (_node, children) => <Text style={{
            marginTop: 20, marginBottom: 15,
            fontSize: 21, fontFamily: 'Neuton-Regular', fontWeight: "400",
            color: "#020202", width: "100%"
        }}>{children}</Text>,
        [BLOCKS.UL_LIST]: (_node, children) => {
            return (
                <View>
                    {children.map((child, i) => {
                        return child;
                    })}
                </View>
            );
        },
        [BLOCKS.OL_LIST]: (_node, children) => {
            return children.map((child, i) => {
                return <View key={i} >{child}</View>;
            });
        },
        [BLOCKS.LIST_ITEM]: (_node, child) => {
            return <View row style={{ marginLeft: 25 }}>
                <View
                    style={{
                        alignSelf: 'flex-start',
                        justifyContent: 'flex-start',
                        marginRight: 12,
                        transform: [{ scale: 2.5 }],
                    }}>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                        }}>
                        {'\u2022'}
                    </Text>
                </View>
                <View>
                    <Text>{child}</Text>
                </View>
            </View>;
        },
        [BLOCKS.QUOTE]: (_node, child) => {
            return <Text>{child}</Text>;
        },
        [BLOCKS.HR]: (_node, child) => {
            return <Text>{child}</Text>;
        },
    },
};

const MyUCHealingRecommendations = () => {
    const content = useContentful({ entry: "2G70naMngD5uS7AcoyBs7d", contentType: "UCHealthAppContent" });
    let title = "";
    let richTextDocument1: any = {};
    if (!content) {
        return <View style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{}}>Loading...</Text>
        </View>
    }
    if (content[0] && content[0][0]?.fields?.content) {
        title = content[0][0]?.fields.title;
        richTextDocument1 = content[0][0]?.fields.content
    }

    const RenderHtml = () => documentToReactComponents(richTextDocument1, contentFulToReactNative)

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
            <ScrollView style={{ height: 500 }} automaticallyAdjustKeyboardInsets={true}>
                <Text style={{
                    marginTop: 25, marginBottom: 20,
                    fontSize: 30, fontFamily: 'Neuton-Regular', fontWeight: "400",
                    color: "#020202", width: "100%"
                }}>{title}</Text>
                <RenderHtml />
            </ScrollView>
        </SafeAreaView>

    );
}

export default MyUCHealingRecommendations;