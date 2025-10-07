import React, { useState, useMemo } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

export default function UseMemoDemoScreen() {
  // 🧩 Base state
  const [numbers] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [count, setCount] = useState(0); // unrelated state, used to trigger re-renders

  // ❌ Without useMemo
  // This computation runs *on every render*, even if 'numbers' didn’t change.
  const evenNumbersWithoutMemo = numbers.filter((n) => {
    console.log('❌ Filtering without useMemo...');
    return n % 2 === 0;
  });

  // ✅ With useMemo
  // This computation will only run when 'numbers' changes.
  const evenNumbersWithMemo = useMemo(() => {
    console.log('✅ Filtering with useMemo...');
    return numbers.filter((n) => n % 2 === 0);
  }, [numbers]);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        🎯 useMemo Side-by-Side Demo
      </Text>

      {/* 🔁 Button to re-render the whole component */}
      <Button
        title="Re-render screen (increment count)"
        onPress={() => setCount(count + 1)}
      />
      <Text style={{ marginTop: 10 }}>Count: {count}</Text>

      {/* Left: Without useMemo */}
      <View style={{ marginTop: 20, backgroundColor: '#fee', padding: 10, borderRadius: 8 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>❌ Without useMemo</Text>
        <Text>Every render logs “Filtering without useMemo...”</Text>
        <Text style={{ marginTop: 5 }}>Even Numbers: {evenNumbersWithoutMemo.join(', ')}</Text>
      </View>

      {/* Right: With useMemo */}
      <View style={{ marginTop: 20, backgroundColor: '#eef', padding: 10, borderRadius: 8 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>✅ With useMemo</Text>
        <Text>Logs “Filtering with useMemo...” only once (unless numbers change)</Text>
        <Text style={{ marginTop: 5 }}>Even Numbers: {evenNumbersWithMemo.join(', ')}</Text>
      </View>
    </ScrollView>
  );
}
