// react-native-zoomable-view.d.ts
declare module 'react-native-zoomable-view' {
    import { Component } from 'react';
    import { ViewStyle, StyleProp } from 'react-native';

    interface ZoomableViewProps {
        children: React.ReactNode;
        zoomStep?: number;
        maxZoom?: number;
        minZoom?: number;
        initialZoom?: number;
        bindToBorders?: boolean;
        style?: StyleProp<ViewStyle>;
    }

    export default class ZoomableView extends Component<ZoomableViewProps> {}
}
