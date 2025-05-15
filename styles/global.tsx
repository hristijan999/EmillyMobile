// MobileApp/styles/global.ts

import { StyleSheet } from 'react-native';

// Define your color palette
export const colors = {
    primary: '#000000',
    secondary: '#cccccc',
    background: '#ffffff',
    text: '#000000',
    grey: '#666666',
    lightGrey: '#f5f5f5',
};

// Define your spacing units
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

// Define your typography styles
export const typography = {
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 18,
        fontWeight: '600',
    },
    body: {
        fontSize: 16,
    },
};

// Define reusable styles
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: spacing.md,
    },
});
