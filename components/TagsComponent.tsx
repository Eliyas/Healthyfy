import React, { useState } from "react";
import { ScrollView, View  } from "react-native";
import { Card, Checkbox, TextField, Colors, Text, Button } from "react-native-ui-lib";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { generateUUID } from "../utils";


const TagsComponent = ({tags, setTags, item, handleTagValueChange}) => {

    const [isTagEditMode, setIsTagEditMode] = useState(false);


    const handleTagChange = (tag: any) => {
        tag.isChecked = !tag.isChecked;
        setTags([...tags]);
    };

    const handleTagRemove = (tagId: string) => {
        const updatedTags: any = [];
        tags.forEach((tag) => {
            if (tag.id !== tagId) updatedTags.push(tag);
        });
        setTags(updatedTags);
    };

    const handleTagAdd = () => {
        const newTag = { id: generateUUID(), label: "", isChecked: false, isEditMode: true, isNew: true };
        setTags([...tags, newTag]);
    };


    return <Card
        activeOpacity={1}
        enableShadow={true}
        style={{
            borderRadius: 0,
            marginHorizontal: 5,
            backgroundColor: "#F6F1F1",
            width: "88%",
            height: 504,
            elevation: 10,
            shadowColor: "#52006A",
            shadowOpacity: 0.2,
            shadowRadius: 3,
            justifyContent: "center",
            alignItems: "center",
        }}
        enableBlur={false}
        paddingH-10
        paddingV-20
        key={item.id}
        onPress={() => console.log("pressed")}
    >
        <ScrollView style={{ height: 280 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                    text70
                    style={{
                        color: "#312E2B", fontWeight: "700", fontSize: 20, marginBottom: 13,
                        textAlign: "center"
                    }}
                >
                    {item.label}
                </Text>
                <FontAwesome
                    onPress={() => setIsTagEditMode(!isTagEditMode)}
                    name="edit"
                    size={21}
                    color="black"
                    style={{ marginTop: 5, marginLeft: 10 }}
                />
            </View>

            {tags.map((tag: any, index: number) => (
                <View
                    style={{ flexDirection: "row", marginHorizontal: 10 }}
                    id={tag.id}
                    key={tag.id}
                >
                    <Button
                        outline
                        borderRadius={0}
                        size={Button.sizes.xSmall}
                        text60
                        $textDefault
                        onPress={() => {
                            if (!tag.isEditMode) handleTagChange(tag)
                        }}
                        labelStyle={{ fontWeight: "400", fontSize: 20, textAlign: "center", color: tag.isChecked ? "#FFFFFF" : "#312E2B" }}
                        style={{
                            height: 50, backgroundColor: tag.isChecked ? "#5C5A57" : "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 13,
                            width: "100%", justifyContent: "center"
                        }}
                    >
                        <Checkbox
                            style={{ marginVertical: 5, marginHorizontal: 5, marginRight: 10, display: "none" }}
                            value={tag.isChecked}
                            onValueChange={() => handleTagChange(tag)}
                        />

                        {
                            !isTagEditMode && <Text text80 style={{
                                fontWeight: "400", fontSize: 20, width: "90%", textAlign: "center",
                                color: tag.isChecked ? "#FFFFFF" : "#312E2B"
                            }}>
                                {tag.label}
                            </Text>
                        }

                        {
                            isTagEditMode && index != tags.length - 1 && <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <Text text80 style={{
                                    fontWeight: "400", fontSize: 20, width: "90%", textAlign: "center",
                                    color: tag.isChecked ? "#FFFFFF" : "#312E2B"
                                }}>
                                    {tag.label}
                                </Text>
                                <AntDesign
                                    onPress={() => handleTagRemove(tag.id)}
                                    name="minuscircleo"
                                    size={21}
                                    style={{ marginLeft: 10 }}
                                    color="black"
                                />
                            </View>
                        }

                        {
                            isTagEditMode && index == tags.length - 1 && <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <TextField
                                    style={{ fontWeight: "400", fontSize: 20, marginRight: 10, width: 200, height: 20 }}
                                    placeholder={"Tag Name"}
                                    value={tag.label}
                                    fieldStyle={{
                                        padding: 4,
                                        borderBottomWidth: 1,
                                        borderColor: Colors.$outlineDisabledHeavy,
                                    }}
                                    onChangeText={(currentValue) => handleTagValueChange(currentValue, tag)}
                                />
                                <AntDesign
                                    onPress={() => handleTagRemove(tag.id)}
                                    name="minuscircleo"
                                    size={21}
                                    style={{ marginLeft: 10 }}
                                    color="black"
                                />
                            </View>
                        }

                    </Button>
                </View>
            ))}

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                <AntDesign
                    onPress={() => handleTagAdd()}
                    name="plus"
                    size={18}
                    color="black"
                />
                <Text onPress={() => handleTagAdd()} text80 style={{ marginLeft: 10, fontWeight: "400", fontSize: 20 }}>
                    Add a tag
                </Text>
            </View>

        </ScrollView>
    </Card>
}

export default TagsComponent;