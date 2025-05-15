import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ImagesList from '../ImagesList';
import Header from '../header';

// Mock the Header component
jest.mock('../header', () => {
  return jest.fn(({ scrollY, onSelectCategory }) => {
    return (
      <div data-testid="mock-header" data-scrolly={scrollY}>
        Mock Header
      </div>
    );
  });
});

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] }))
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    useSharedValue: jest.fn((initialValue) => ({ value: initialValue })),
    useAnimatedStyle: jest.fn(() => ({})),
    withTiming: jest.fn((toValue) => toValue),
    Extrapolation: { CLAMP: 'clamp' },
  };
});

describe('ImagesList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('passes scrollY to Header component', () => {
    const { getByTestId } = render(<ImagesList />);
    
    // Initially scrollY should be 0
    expect(Header).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollY: 0,
      }),
      expect.anything()
    );
    
    // Simulate scroll event
    const flatList = getByTestId('images-flatlist');
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: {
          y: 50,
        },
        contentSize: { height: 500, width: 100 },
        layoutMeasurement: { height: 100, width: 100 },
      },
    });
    
    // After scrolling, scrollY should be updated to 50
    expect(Header).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollY: 50,
      }),
      expect.anything()
    );
  });
});