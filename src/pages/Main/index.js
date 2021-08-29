import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  getNewNumber,
  moveCursorToNextComplete,
} from '../../store/actions/defaultActions';
import {useDispatch, useSelector} from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  const {myNumberList} = useSelector(state => {
    return state.defaultReducer;
  });

  useEffect(() => {
    if (myNumberList.length === 2) {
      //invokes epic with MOVE_CURSOR_NEXT
      dispatch(moveCursorToNextComplete(0)); //0 is nextUncoveredIdx
    }
  }, [myNumberList.length]);

  useEffect(() => {
    let time = 0;

    const myInterval = setInterval(() => {
      if (time < 5) {
        console.log('at timer', time);
        dispatch(getNewNumber());

        time++;
      } else {
        console.log('timer stopped less than 5');
        clearInterval(myInterval);
      }
    }, 1000);

    return () => {
      console.log('timer stopped at clean up');
      clearInterval(myInterval);
    };
  }, []);

  return (
    <View style={sty.pageBase}>
      <View style={sty.boxesContainer}>
        {myNumberList.map((element, index) => (
          <View style={sty.box} key={index}>
            <Text>{element.index}</Text>
            <Text>{element.covered.toString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const sty = StyleSheet.create({
  pageBase: {
    backgroundColor: 'beige',
    flex: 1,
    width: '100%',
  },
  boxesContainer: {
    flexDirection: 'row',
  },
  box: {
    height: 40,
    width: 40,
    margin: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
});
