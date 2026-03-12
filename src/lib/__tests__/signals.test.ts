import { extractSignals } from '../signals'

describe('extractSignals', () => {
    it('should extract payment signals correctly', () => {
        const tips = [
            { content: 'Always carry cash, UPI is unreliable here', created_at: new Date().toISOString() }
        ]
        const signals = extractSignals(tips)
        const paymentSignal = signals.find(s => s.key === 'payments')
        expect(paymentSignal?.value).toBe('Cash preferred (UPI unreliable)')
    })

    it('should extract network signals correctly', () => {
        const tips = [
            { content: 'No network near the beach', created_at: new Date().toISOString() }
        ]
        const signals = extractSignals(tips)
        const networkSignal = signals.find(s => s.key === 'network')
        expect(networkSignal?.value).toBe('Poor connectivity')
    })

    it('should handle multiple signals in one tip', () => {
        const tips = [
            { content: 'Carry cash and only BSNL works', created_at: new Date().toISOString() }
        ]
        const signals = extractSignals(tips)
        expect(signals).toHaveLength(2)
        expect(signals.map(s => s.key)).toContain('payments')
        expect(signals.map(s => s.key)).toContain('network')
    })

    it('should determine confidence based on count', () => {
        const tips = Array(5).fill({ content: 'carry cash', created_at: new Date().toISOString() })
        const signals = extractSignals(tips)
        const paymentSignal = signals.find(s => s.key === 'payments')
        expect(paymentSignal?.confidence).toBe('high')
    })
})
