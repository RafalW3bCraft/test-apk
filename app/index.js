// app/index.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import NotesList from '../components/NotesList';
import AddNoteButton from '../components/AddNoteButton';
import NoteModal from '../components/NoteModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function NotebookApp() {
  const [notes, setNotes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setIsModalVisible(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalVisible(true);
  };

  const handleSaveNote = (title, content) => {
    const newNote = {
      id: editingNote?.id || Date.now().toString(),
      title,
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedNotes = editingNote
      ? notes.map((note) => (note.id === editingNote.id ? newNote : note))
      : [newNote, ...notes];

    saveNotes(updatedNotes);
    setIsModalVisible(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    saveNotes(updatedNotes);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <NotesList
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
        <AddNoteButton onPress={handleAddNote} />
        <NoteModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setEditingNote(null);
          }}
          onSave={handleSaveNote}
          note={editingNote}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});