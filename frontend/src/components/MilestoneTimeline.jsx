import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Heart, Zap, Award } from 'lucide-react';

export default function MilestoneTimeline({ setActiveTab }) {
  const [activeMilestone, setActiveMilestone] = useState(0);

  const milestones = [
    {
      id: 0,
      timeframe: 'Hour 1 – 3',
      subtitle: 'Immediate Glycemic Shield',
      title: 'Gastric Viscosity Formation & Glucose Plateau',
      color: '#c67139',
      badgeBg: 'bg-[#fff2eb] text-[#8c491a]',
      icon: Zap,
      description: 'Oat Beta-Glucan absorbs liquid and creates an organic viscosity web in the upper intestine. Carbohydrate breakdown is paced evenly, preventing reactive insulin surges and mid-afternoon energy crashes.',
      biomarkers: [
        '38% Reduction in Post-Meal Glycemic Velocity',
        'Prolonged Gastric Satiety for 4+ Hours',
        'Zero Gel-Like Grittiness or Stomach Heaviness',
      ],
      sensoryFeel: 'Light, refreshed stomach; no sugar craving or sudden hunger spike.',
    },
    {
      id: 1,
      timeframe: 'Day 3 – 7',
      subtitle: 'Microbiome Awakening',
      title: 'Distal Fermentation & Regularity Genesis',
      color: '#7a8a5e',
      badgeBg: 'bg-[#e1eecc] text-[#3d472b]',
      icon: Clock,
      description: 'Acacia Fibregum™ reaches the distal colon intact. Fermentation stimulates beneficial Akkermansia muciniphila and Bifidobacteria, kickstarting natural digestive peristalsis without harsh laxative spasms.',
      biomarkers: [
        'Gentle Bowel Motility Normalization',
        'Early Elevation in Acetate & Propionate SCFAs',
        'Low-FODMAP Fermentation (Zero Painful Gas)',
      ],
      sensoryFeel: 'Predictable, effortless daily morning bowel movement.',
    },
    {
      id: 2,
      timeframe: 'Day 14 – 21',
      subtitle: 'Barrier Fortification',
      title: 'Gut Lining Tightening & Bloat Dissipation',
      color: '#201e1d',
      badgeBg: 'bg-[#ebddc5] text-[#201e1d]',
      icon: ShieldCheck,
      description: 'Colonic Butyrate reaches therapeutic concentrations, fueling intestinal epithelial cells (colonocytes) and reinforcing tight junction proteins (Claudin-1 and Occludin). Abdominal bloat dissipates completely.',
      biomarkers: [
        '+42% Colonic Butyrate Concentration',
        'Tight Junction Protein Upregulation',
        'Measurable Reduction in Waist Distension',
      ],
      sensoryFeel: 'Flat, comfortable stomach after meals with zero post-lunch distension.',
    },
    {
      id: 3,
      timeframe: 'Day 30 – 90+',
      subtitle: 'Metabolic Baseline Shift',
      title: 'AMPK Upregulation & Post-GLP-1 Stability',
      color: '#c67139',
      badgeBg: 'bg-[#fff2eb] text-[#8c491a]',
      icon: Award,
      description: 'Synergistic Berberine AMPK activation and consistent high-fiber intake restore cellular insulin sensitivity, enhance lipid metabolism, and maintain muscle mass while curbing post-medication rebound.',
      biomarkers: [
        'Enhanced Fasting Glycemic Sensitivity',
        'Sustained Endogenous GLP-1 and PYY Signaling',
        'Resilient Gut-Brain Axis & Mental Clarity',
      ],
      sensoryFeel: 'Steady all-day stamina, sharp focus, and unbreakable metabolic resilience.',
    },
  ];

  const current = milestones[activeMilestone];
  const MilestoneIcon = current.icon;

  return (
    <section className="py-12 lg:py-16 bg-[#f5ead8]">
      <div className="container-max space-y-10 text-left">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff2eb] text-[#8c491a] text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#c67139]" />
              <span>Physiological Journey</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d] leading-tight">
              What Happens in Your Body: The 90-Day Timeline
            </h2>
            <p className="text-sm sm:text-base text-[#201e1d]/75 font-sans">
              Real metabolic health isn't a quick fix — it’s a progressive biological transformation. Track how TriFiber rebuilds your microbiome and glycemic baseline over time.
            </p>
          </div>

          <div className="text-xs font-mono text-[#201e1d]/60 font-semibold self-start md:self-auto">
            Clinical Trial Biomarker Tracking
          </div>
        </div>

        {/* Milestone Horizontal Selector / Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {milestones.map((m, idx) => {
            const isSelected = activeMilestone === idx;
            const IconComp = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMilestone(idx)}
                className={`text-left rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#ebddc5] border-[#c67139] shadow-md ring-2 ring-[#c67139]/20 -translate-y-0.5'
                    : 'bg-[#ebddc5]/50 border-[#201e1d]/10 hover:bg-[#ebddc5] hover:border-[#201e1d]/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${m.badgeBg}`}>
                    {m.timeframe}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#f5ead8]"
                    style={{ backgroundColor: m.color }}
                  >
                    <IconComp className="w-3 h-3" />
                  </div>
                </div>
                <div className="font-serif text-base text-[#201e1d] line-clamp-1">
                  {m.subtitle}
                </div>
                <div className="text-[11px] font-sans text-[#201e1d]/70 line-clamp-1 mt-0.5">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card */}
        <div className="bg-[#ebddc5] border border-[#201e1d]/15 rounded-[32px] p-6 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`tag ${current.badgeBg} font-mono text-xs font-bold`}>
                  {current.timeframe}
                </span>
                <span className="text-xs font-mono text-[#201e1d]/60 font-semibold">
                  {current.subtitle}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#201e1d]">
                {current.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#201e1d]/85 leading-relaxed font-sans">
              {current.description}
            </p>

            {/* Biomarker Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#201e1d]/60">
                Key Validated Biomarkers
              </div>
              <div className="space-y-2">
                {current.biomarkers.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#201e1d]">
                    <CheckCircle2 className="w-4 h-4 text-[#7a8a5e] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sensory Outcome & Routine Box */}
          <div className="lg:col-span-5 bg-[#f5ead8] rounded-[28px] p-6 sm:p-8 border border-[#201e1d]/15 space-y-6 flex flex-col justify-between shadow-inner">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c67139]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#201e1d]">
                  How You Will Feel
                </span>
              </div>

              <div className="bg-[#ebddc5]/60 rounded-2xl p-4 border border-[#201e1d]/10 text-xs sm:text-sm font-serif italic text-[#201e1d] leading-relaxed">
                "{current.sensoryFeel}"
              </div>

              <div className="text-xs text-[#201e1d]/75 space-y-1.5 font-sans">
                <div className="font-bold text-[#201e1d]">The Recommended Routine:</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c67139]"></span>
                  <span>1 scoop TriFiber Daily in water, morning or with first meal.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7a8a5e]"></span>
                  <span>1 capsule Berberine Balance 15-min before largest meal.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab && setActiveTab('trifiber-daily')}
                className="btn btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2"
              >
                <span>Start Your 90-Day Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
