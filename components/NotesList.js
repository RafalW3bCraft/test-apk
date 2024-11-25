import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NoteCard from './NoteCard';

export default function NotesList({ notes, onEditNote, onDeleteNote }) {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteCard
          note={item}
          onEdit={() => onEditNote(item)}
          onDelete={() => onDeleteNote(item.id)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});
