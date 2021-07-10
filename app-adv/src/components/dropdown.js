import React, { Component } from "react";
import { View, Picker } from "react-native";

export default ({ lista, descricao, sel, handleClick, style }) => {
  const _pickerChange = (index) => {
    lista.map((v, i) => {
      if (index === i) {
        handleClick(lista[index].id);
      }
    });
  };
  return (
    <View style={style}>
      <Picker
        selectedValue={sel}
        onValueChange={(itemValor, itemindex) => _pickerChange(itemindex)}
        style={{ color: "#FFF" }}
      >
        {lista.map((v) => {
          return (
            <Picker.Item label={String(v[descricao])} value={v.id} key={v.id} />
          );
        })}
      </Picker>
    </View>
  );
};
