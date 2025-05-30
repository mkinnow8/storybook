import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {useChildContext} from '../context/ChildContext';
import {theme} from '../theme/theme';

const ChildInfoScreen = () => {
  const {childInfo} = useChildContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitChildInfo = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Create FormData object
      const formData = new FormData();

      // Append text fields
      formData.append('name', childInfo.name);
      formData.append('gender', childInfo.gender);
      formData.append('age', childInfo.age?.toString() || '');

      // Append image if exists
      if (childInfo.image) {
        formData.append('image', {
          uri: childInfo.image,
          type: 'image/jpeg',
          name: 'child_image.jpg',
        } as any);
      }

      // Make API call
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      console.log('Submission successful:', result);
    } catch (err) {
      console.error('Error submitting data:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit data');
    } finally {
      setIsSubmitting(false);
    }
  }, [childInfo]);

  useEffect(() => {
    // Log all info to the console
    console.log('Submitted Child Info:', childInfo);
    // Submit data when screen loads
    submitChildInfo();
  }, [childInfo, submitChildInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Submission Complete" showBackButton={false} />
      <View style={styles.content}>
        {isSubmitting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>
              Submitting your information...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
            <Text style={styles.message}>
              Please try again later or contact support if the problem persists.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>🎉 Submission Successful! 🎉</Text>
            <Text style={styles.message}>
              Thank you! All your information has been submitted successfully.
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
});

export default ChildInfoScreen;
