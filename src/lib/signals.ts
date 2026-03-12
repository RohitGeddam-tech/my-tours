// src/lib/signals.ts
// Maps tip content to Reality Layer signal keys using keyword matching.
// Intentionally simple for Phase 1 — replace with NLP classifier in Phase 3.

type Signal = {
    key: string
    label: string
    value: string
    confidence: 'high' | 'medium' | 'low'
    report_count: number
    last_updated: string
}

const SIGNAL_PATTERNS: { pattern: RegExp; key: string; value: string }[] = [
    {
        pattern: /carry cash|upi.*unreliable|upi.*doesn't work|no upi/i,
        key: 'payments', value: 'Cash preferred (UPI unreliable)'
    },
    {
        pattern: /upi.*works|upi.*fine|upi.*available/i,
        key: 'payments', value: 'UPI available'
    },
    {
        pattern: /no network|poor network|no signal|no internet/i,
        key: 'network', value: 'Poor connectivity'
    },
    {
        pattern: /only bsnl|bsnl works/i,
        key: 'network', value: 'Only BSNL reliable'
    },
    {
        pattern: /crowded|very busy|book.*ahead|no rooms/i,
        key: 'crowds', value: 'High — book in advance'
    },
    {
        pattern: /not crowded|quiet|peaceful|low crowd/i,
        key: 'crowds', value: 'Low'
    },
    {
        pattern: /overcharg|scam|watch out|tourist trap/i,
        key: 'scams', value: 'Alerts reported — read tips'
    },
    {
        pattern: /no atm|atm.*far|carry cash.*atm/i,
        key: 'atms', value: 'Limited'
    },
    {
        pattern: /altitude|oxygen|acclimatise/i,
        key: 'oxygen_risk', value: 'High above 3,500m'
    },
    {
        pattern: /road.*bad|narrow road|road.*closed/i,
        key: 'roads', value: 'Caution advised'
    },
    {
        pattern: /road.*good|road.*fine/i,
        key: 'roads', value: 'Good condition'
    },
    {
        pattern: /poor lighting|dark at night|unsafe after/i,
        key: 'night_safety', value: 'Low — limited lighting'
    },
]

export function extractSignals(tips: { content: string; created_at: string }[]): Signal[] {
    const counts: Record<string, { values: string[]; dates: string[] }> = {}

    for (const tip of tips) {
        for (const { pattern, key, value } of SIGNAL_PATTERNS) {
            if (pattern.test(tip.content)) {
                if (!counts[key]) counts[key] = { values: [], dates: [] }
                counts[key].values.push(value)
                counts[key].dates.push(tip.created_at)
            }
        }
    }

    return Object.entries(counts).map(([key, { values, dates }]) => {
        const count = values.length
        // Most frequent value wins
        const topValue = values.sort((a, b) =>
            values.filter(v => v === b).length - values.filter(v => v === a).length
        )[0]

        const lastUpdated = dates.sort().reverse()[0]

        return {
            key,
            label: keyToLabel(key),
            value: topValue,
            confidence: count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low',
            report_count: count,
            last_updated: lastUpdated,
        }
    })
}

function keyToLabel(key: string): string {
    const labels: Record<string, string> = {
        payments: 'Payments',
        network: 'Network',
        crowds: 'Crowds',
        scams: 'Scam Alerts',
        atms: 'ATMs',
        oxygen_risk: 'Oxygen Risk',
        roads: 'Roads',
        night_safety: 'Night Safety',
    }
    return labels[key] ?? key
}