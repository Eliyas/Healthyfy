


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


export const MetricType = {
    NONE: "None",
    LOW: "Low",
    MODERATE: "Moderate",
    HIGH: "High",
    VERY_HIGH: "Very High",
    EMERGENCY: "Emergency!"
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