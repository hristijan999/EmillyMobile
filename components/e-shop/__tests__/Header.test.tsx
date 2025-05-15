import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../header';
import { View } from 'react-native';

// Mock the react-native-reanimated module
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  
  // Mock the interpolate function
  Reanimated.interpolate = jest.fn((value, inputRange, outputRange) => {
    // Simple mock implementation of interpolate
    if (value <= inputRange[0]) return outputRange[0];
    if (value >= inputRange[1]) return outputRange[1];
    
    // Linear interpolation
    const progress = (value - inputRange[0]) / (inputRange[1] - inputRange[0]);
    return outputRange[0] + progress * (outputRange[1] - outputRange[0]);
  });
  
  return {
    ...Reanimated,
    useSharedValue: jest.fn((initialValue) => ({ value: initialValue })),
    useAnimatedStyle: jest.fn((callback) => callback()),
    withTiming: jest.fn((toValue) => toValue),
    Extrapolation: { CLAMP: 'clamp' },
  };
});

describe('Header Component', () => {
  const mockSelectCategory = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders correctly', () => {
    const { getByTestId } = render(
      <Header scrollY={0} onSelectCategory={mockSelectCategory} />
    );
    
    expect(getByTestId('header-container')).toBeTruthy();
    expect(getByTestId('header-image')).toBeTruthy();
  });
  
  test('opacity decreases when scrolling down', () => {
    // Test with scrollY = 0 (fully visible)
    const { rerender, getByTestId } = render(
      <Header scrollY={0} onSelectCategory={mockSelectCategory} />
    );
    
    const headerContainer = getByTestId('header-container');
    expect(headerContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ opacity: 1 })
      ])
    );
    
    // Test with scrollY = 100 (fully transparent)
    rerender(<Header scrollY={100} onSelectCategory={mockSelectCategory} />);
    
    expect(headerContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ opacity: 0 })
      ])
    );
    
    // Test with scrollY = 50 (partially transparent)
    rerender(<Header scrollY={50} onSelectCategory={mockSelectCategory} />);
    
    expect(headerContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ opacity: 0.5 })
      ])
    );
  });
});