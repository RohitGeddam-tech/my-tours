'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ThumbsUp, AlertTriangle, Lightbulb, CheckCircle, Shield, AlertCircle, Brain } from 'lucide-react'
import type { Tip, TipType } from '@/lib/types'

interface TipCardProps {
  tip: Tip
}

const tipStyles: Record<TipType, { icon: typeof AlertTriangle; color: string; bg: string; label: string }> = {
  warning: {
    icon: AlertTriangle,
    color: 'text-chart-4',
    bg: 'bg-chart-4/10',
    label: 'Warning',
  },
  recommendation: {
    icon: Lightbulb,
    color: 'text-chart-2',
    bg: 'bg-chart-2/10',
    label: 'Recommendation',
  },
  advice: {
    icon: CheckCircle,
    color: 'text-chart-1',
    bg: 'bg-chart-1/10',
    label: 'Helpful Advice',
  },
  safety: {
    icon: Shield,
    color: 'text-primary',
    bg: 'bg-primary/10',
    label: 'Safety Note',
  },
  scam: {
    icon: AlertCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    label: 'Scam Alert',
  },
  hack: {
    icon: Brain,
    color: 'text-accent',
    bg: 'bg-accent/10',
    label: 'Local Hack',
  },
}

export function TipCard({ tip }: TipCardProps) {
  const [upvotes, setUpvotes] = useState(tip.upvotes)
  const [hasUpvoted, setHasUpvoted] = useState(false)

  const style = tipStyles[tip.type]
  const Icon = style.icon

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1)
      setHasUpvoted(false)
    } else {
      setUpvotes(prev => prev + 1)
      setHasUpvoted(true)
    }
  }

  return (
    <div className={`p-4 rounded-lg ${style.bg} border border-border`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${style.color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium ${style.color}`}>
              {style.label}
            </span>
          </div>
          <p className="text-sm text-foreground">{tip.content}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-shrink-0 gap-1 ${hasUpvoted ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={handleUpvote}
        >
          <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'fill-current' : ''}`} />
          <span className="text-xs">{upvotes}</span>
        </Button>
      </div>
    </div>
  )
}
