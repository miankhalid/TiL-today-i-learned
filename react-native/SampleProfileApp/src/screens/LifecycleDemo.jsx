import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

// --- Child Component ---
function Child({ count }) {
  // Mount
  useEffect(() => {
    console.log("✅ Child Mounted");

    // Cleanup (Unmount)
    return () => {
      console.log("❌ Child Unmounted");
    };
  }, []);

  // Update (runs whenever count changes)
  useEffect(() => {
    if (count > 0) {
      console.log(`🔄 Child Updated - count is now ${count}`);
    }
  }, [count]);

  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
      <Text style={{ fontSize: 18 }}>Count in Child: {count}</Text>
    </View>
  );
}

// --- Parent Component ---
export default function LifecycleDemo() {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showChild && <Child count={count} />}

      <View style={{ marginTop: 20 }}>
        <Button title="Increase Count" onPress={() => setCount(count + 1)} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title={showChild ? "Hide Child (Unmount)" : "Show Child (Mount)"}
          onPress={() => setShowChild(!showChild)}
        />
      </View>
    </View>
  );
}
