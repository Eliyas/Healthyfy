


export const FieldLabelType = {
    DateTime: "Date & Time",
    Time: "Time",
    Urgency_Only: "Urgency",
    Urgency: "Gauging Urgency",
    Consistency: "Consistency",
    Spray: "Spray",
    Volume: "Volume",
    Blood: "Blood",
    Gas: "Gas",
    Pain: "Pain",
    Nausea: "Nausea",
    Tag: "Tags",
    Submit: "Submit",
}

export const MetricTypeInfo = {
    NONE: { id: "6", label: "None", displayName: "none 👌" },
    LOW: { id: "4", label: "Low", displayName: "low 👍" },
    MODERATE: { id: "5", label: "Moderate", displayName: "moderate 🙂" },
    HIGH: { id: "3", label: "High", displayName: "high 😖" },
    VERY_HIGH: { id: "2", label: "Very High", displayName: "very high 😣" },
    EMERGENCY: { id: "1", label: "Emergency!", displayName: "emergency 😓" }
}


export const ConsistencyType = {
    FORMED: { id: "1", label: "Formed", displayName: "Formed" },
    SOFT: { id: "2", label: "Soft", displayName: "Soft" },
    LOOSE: { id: "3", label: "Loose", displayName: "Loose" },
    LIQUID: { id: "4", label: "Liquid", displayName: "Liquid" }
}

export const MetricType = {
    NONE: "None",
    LOW: "Low",
    MODERATE: "Moderate",
    HIGH: "High",
    VERY_HIGH: "Very High",
    EMERGENCY: "Emergency!",
    
    FORMED: "Formed",
    SOFT: "Soft",
    LOOSE: "Loose",
    LIQUID: "Liquid",
}


export const MoodTypes = {
    Happy: { id: 1, label: "Happy", typeName: "Happy", emoji: "😊", isSelected: false },
    EXCITED: { id: 1, label: "Excited", typeName: "Excited", emoji: "😀", isSelected: false },
    Grateful: { id: 1, label: "Grateful", typeName: "Grateful", emoji: "😍", isSelected: false },
    Relaxed: { id: 1, label: "Relaxed", typeName: "Relaxed", emoji: "😌", isSelected: false },
    Content: { id: 1, label: "Content", typeName: "Content", emoji: "🙂", isSelected: false },
    Tired: { id: 1, label: "Tired", typeName: "Tired", emoji: "😴", isSelected: false },
    Unsure: { id: 1, label: "Unsure", typeName: "Unsure", emoji: "😕", isSelected: false },
    Bored: { id: 1, label: "Bored", typeName: "Bored", emoji: "😐", isSelected: false },
    Anxious: { id: 1, label: "Anxious", typeName: "Anxious", emoji: "😬", isSelected: false },
    Angry: { id: 1, label: "Angry", typeName: "Angry", emoji: "😡", isSelected: false },
    Stressed: { id: 1, label: "Stressed", typeName: "Stressed", emoji: "😫", isSelected: false },
    Sad: { id: 1, label: "Sad", typeName: "Sad", emoji: "😔", isSelected: false }
}

export const DEVICE_UNIQUE_ID_KEY = "DEVICE_UNIQUE_ID_KEY";