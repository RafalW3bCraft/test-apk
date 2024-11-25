import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onEdit} style={styles.contentContainer}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.preview} numberOfLines={2}>
          {note.content}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(note.timestamp).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Feather name="trash-2" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  preview: {
    fontSize: 14,
    color: '#636366',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 8,
  },
});
