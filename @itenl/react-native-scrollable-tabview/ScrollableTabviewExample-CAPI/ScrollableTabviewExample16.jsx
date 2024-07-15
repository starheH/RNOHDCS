import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, SectionList, StatusBar, Button } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from '@itenl/react-native-scrollable-tabview';
import { Tester, TestSuite, TestCase } from '@rnoh/testerino';

class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: Date.now(),
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: Date.now(),
            });
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onRefresh = (toggled) => {
        this.toggled = toggled;
        this.toggled && this.toggled();
        this.toggled && this.toggled();
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#f0f0f0",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>
                    Props所带属性:{" "}
                    {JSON.stringify(Object.keys(this.props).join("|"), null, 2)}
                </Text>
                <Text>topropsTextValue: {this.props.topropsTextValue}</Text>
                <Text>状态时间戳: {this.state.time}</Text>
                <Text>时间戳: {this.props.rootTime}</Text>
            </View>
        );
    }
}

class Screen2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notMore: false,
            list: Array.from({ length: 10 }, (val, i) => {
                return { index: i };
            }).map((item, index) => {
                return {
                    title: `--- title ${index} ---`,
                    index,
                };
            }),
        };
    }
    onRefresh = (toggled) => {
        this.toggled = toggled;
        this.toggled && this.toggled();
        this.toggled && this.toggled();
    };

    onEndReached = () => {
        if (this.state.list.length >= 50 || this.state.notMore) {
            this.setState({
                notMore: true,
            });
            return;
        }
        let length = this.state.list.length;
        this.state.list = this.state.list.concat(
            Array.from({ length: 10 }, (val, i) => {
                return { index: i };
            }).map((item, index) => {
                return {
                    title: `--- title ${length + index} ---`,
                    index: length + index,
                };
            })
        );
        this.setState({
            list: this.state.list,
        });
    };

    componentDidUpdate() {
        console.log('Screen componentDidUpdate')
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#f1f1f1",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>
                    props所带属性:{" "}
                    {JSON.stringify(Object.keys(this.props).join("|"), null, 2)}
                </Text>
                <Text>topropsTextValue: {this.props.topropsTextValue}</Text>
                <Text>时间戳: {this.props.rootTime}</Text>
                {this.state.notMore && (
                    <TouchableOpacity
                        onPress={() => {
                            // this.props.scrollTo(0);
                            this.props.scrollTo(-1000);
                        }}
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "pink",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            right: 0,
                            bottom: 200,
                        }}
                    >
                        <Text>GoTop</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={{
                        width: 150,
                        height: 50,
                        backgroundColor: "pink",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        this.props.toTabView("Screen1");
                    }}
                >
                    <Text>回到Screen1</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: "#fcfcfc", flex: 1 }}>
                    {this.state.list.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{ height: 80, borderWidth: 1, borderColor: "pink" }}
                            >
                                <Text>{JSON.stringify(item)}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}

class Sticky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>
                    this.props{" "}
                    {JSON.stringify(Object.keys(this.props).join("|"), null, 2)}
                </Text>
                {this.props.screenContext && (
                    <Text>
                        this.props.screenContext.props.rootTime:{" "}
                        {this.props.screenContext.props.rootTime}
                    </Text>
                )}
                <TouchableOpacity
                    onPress={() => {
                        this.props.screenContext.onRefresh();
                    }}
                    style={{ backgroundColor: "pink", width: 150, height: 50 }}
                >
                    <Text>Call Screen method</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    height: 80,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "red" }}>title已经向上滑动了</Text>
            </View>
        );
    }
}

const DATA = [
    {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];

export default class ScrollableTabviewExample16 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootTime: Date.now(),
            stacks: [],
            firstIndex: 0,
            useScroll: false,
            scroll: "0",
            scroll2Horizontal: "0",
            errorText: ''
        };
    }

    handleButtonClick = (errorToThrow) => {
        try {
            if (errorToThrow) {
                this.state.errorText = 'error!!!!!!!,通过errorToThrow抛出'
            } else {
                this.state.errorText = 'error!!!!!!!,通过抛出系统console.error抛出'
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    initStacks() {
        return [
            {
                screen: Screen1,
                tabLabel: "Screen1",
                toProps: {
                    topropsTextValue: Math.random(),
                },
            },
            {
                screen: Screen2,
                sticky: Sticky,
                toProps: {
                    topropsTextValue: Math.random(),
                },
                tabLabel: "Screen2",
                badge: [
                    <Text
                        key={0}
                        style={{
                            zIndex: 1,
                            position: "absolute",
                            top: 9,
                            right: -3,
                            width: 19,
                            height: 9,
                            backgroundColor: "green",
                            borderRadius: 5,
                            textAlign: "center",
                            lineHeight: 9,
                            color: "#ffffff",
                            fontSize: 8,
                        }}
                    >
                        new
                    </Text>,
                ],
            },
        ];
    }

    componentDidMount() {
        this.setState({
            stacks: this.initStacks(),
        });
        setTimeout(() => {
            const stacks = this.state.stacks;
            if (stacks && stacks[1]) {
                stacks[1].tabLabelRender = (tabLabel) => {
                    return `--- ${tabLabel} ---`;
                };
                this.setState({
                    stacks,
                });
            }
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    refreshCurrentTab = () => {
        if (this.scrollableTabView) {
            const currentTabScreen = this.scrollableTabView.getCurrentRef();
            if (currentTabScreen && currentTabScreen.onRefresh)
                currentTabScreen.onRefresh();
        }
    };

    pushStack() {
        const stacks = this.state.stacks;
        const tabLabel = `Screen${stacks.length + 1}`;
        const temp = {
            screen: Screen1,
            tabLabel,
            toProps: {
                topropsTextValue: Math.random(),
                tabLabel,
            },
        };
        stacks.push(temp);
        this.setState({
            stacks,
            firstIndex: stacks.length - 1,
        });
    }

    pushTips() {
        if (this.state.useScroll) {
            alert("Setting useScroll to true will not be able to layout");
            this.changeUseScroll();
        }
        const stacks = this.state.stacks;
        stacks[1].badge.push(
            <View
                key={stacks[1].badge.length + 1}
                style={{
                    zIndex: 100,
                    marginLeft: 0,
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                }}
            >
                <View
                    style={{
                        zIndex: 100,
                        left: 25,
                        bottom: 2,
                        position: "absolute",
                        right: 0,
                        width: 0,
                        height: 0,
                        borderStyle: "solid",
                        borderWidth: 6,
                        borderTopColor: "#ffffff00",
                        borderRightColor: "#ffffff00",
                        borderBottomColor: "#006ff6",
                        borderLeftColor: "#ffffff00",
                    }}
                ></View>
                <View
                    style={{
                        left: 100,
                        marginLeft: -280,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -3,
                        position: "absolute",
                        paddingHorizontal: 35,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 8,
                            backgroundColor: "#006ff6",
                            borderRadius: 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                lineHeight: 16,
                                textAlign: "left",
                                color: "#ffffff",
                                fontSize: 12,
                            }}
                        >
                            {stacks[1].badge.length} Show Tips {Math.random()}
                        </Text>
                    </View>
                </View>
            </View>
        );
        this.setState(stacks, () => {
            let timer = setTimeout(() => {
                this.state.stacks[1].badge.splice(
                    this.state.stacks[1].badge.length - 1,
                    1
                );
                this.setState({
                    stacks: this.state.stacks,
                });
                clearTimeout(timer);
            }, 3000);
        });
    }

    changeUseScroll() {
        this.setState({
            useScroll: !this.state.useScroll,
        });
    }

    render() {
        return (
            <Tester>
                <TestSuite name="TesterScrollableTabviewExample16" >
                    <TestCase
                        tags={['C_API']}
                        itShould="下划线动画,长度为200" >
                        <View style={{ width: '100%', height: 500 }}>
                            <ScrollableTabView
                                ref={(it) => (this.scrollableTabView = it)}
                                onTabviewChanged={(index, tabLabel) => {
                                    // console.log(`${index},${tabLabel}`);
                                    this.refreshCurrentTab();
                                }}
                                mappingProps={{
                                    rootTime: this.state.rootTime,
                                }}
                                stacks={this.state.stacks}
                                tabsStyle={{ borderTopWidth: 0.5, borderTopColor: "#efefef" }}
                                tabWrapStyle={(item, index) => {
                                    if (index == 1) return { zIndex: 10 };
                                }}
                                useScrollStyle={{
                                    paddingHorizontal: 50,
                                }}
                                tabStyle={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    paddingHorizontal: 15,
                                    backgroundColor: "pink",
                                    width: 100,
                                }}
                                textStyle={{}}
                                textActiveStyle={{
                                    color: "red",
                                }}
                                header={() => {
                                    return (
                                        <View
                                            style={{
                                                flex: 1,
                                                height: 180,
                                                backgroundColor: "pink",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text>开始</Text>
                                            <Text>时间戳: {this.state.rootTime}</Text>
                                            <TouchableOpacity onPress={this.pushTips.bind(this)}>
                                                <Text>Push Tips</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.pushStack.bind(this)}>
                                                <Text>点击新增Screen(新增Stacks)</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.changeUseScroll.bind(this)}>
                                                <Text>
                                                    是否使用滚动模式显示Screen: {this.state.useScroll.toString()}
                                                </Text>
                                                <Text>
                                                    监听滚动Scroll: {this.state.scroll}
                                                </Text>
                                                <Text>
                                                    监听横向滚动Scroll2Horizontal: {this.state.Scroll2Horizontal}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.scrollableTabView.clearStacks(() => {
                                                        this.setState({
                                                            firstIndex: 0,
                                                            stacks: this.initStacks(),
                                                        });
                                                    });
                                                }}
                                            >
                                                <Text>清除增加的Screen(即清除Stacks)</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                                firstIndex={this.state.firstIndex}
                                title={<Title></Title>}
                                titleArgs={{
                                    interpolateOpacity: {
                                        inputRange: [160, 320],
                                        outputRange: [0.5, 1],
                                        extrapolate: "clamp",
                                    },
                                    style: {},
                                }}
                                onScroll={({ nativeEvent }) => {
                                    this.state.scroll = nativeEvent.contentOffset.y;
                                }}
                                onScroll2Horizontal={({ nativeEvent }) => {
                                    this.state.Scroll2Horizontal = nativeEvent.contentOffset.x;
                                }}
                                onBeforeRefresh={async (next, toggled) => {
                                    toggled();
                                    setTimeout(() => {
                                        toggled();
                                        next();
                                    }, 3000);
                                }}
                                toTabsOnTab={true}
                                oneTabHidden={true}
                                enableCachePage={true}
                                fixedTabs={true}
                                tabsEnableAnimatedUnderlineWidth={200}
                                tabsEnableAnimated={true}
                                useScroll={this.state.useScroll}
                                toHeaderOnTab={true}
                            >
                            </ScrollableTabView>
                        </View>
                    </TestCase>
                </TestSuite>
            </Tester>
        );
    }
}

console.disableYellowBox = true;