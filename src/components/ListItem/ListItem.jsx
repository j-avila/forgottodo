import { Text, TouchableHighlight } from 'react-native';
import React from 'react';

const ListItem = ({ data }) => {
  return (
    <TouchableHighlight
      key={data.key}
      onPress={() => console.log(data)}
      // onShowUnderlay={separators.highlight}
      // onHideUnderlay={separators.unhighlight}
    >
      <Text>{data.name}</Text>
    </TouchableHighlight>
  );
};

export default ListItem;
