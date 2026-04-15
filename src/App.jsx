import { useState, useEffect, useRef } from "react";

const SCENES = [
  {
    id: "intro",
    phase: null,
    title: "Strategy Coach Demo",
    subtitle: "Pillars Fund Engagement",
  },
  {
    id: "discovery",
    phase: "Discovery",
    title: "Processing Discovery Materials",
    subtitle: "A strategist uploads Pillars Fund's theory of change and asks for synthesis.",
  },
  {
    id: "altitude-catch",
    phase: "Narrative Goal Drafting",
    title: "Catching Altitude Drift",
    subtitle: "A strategist drafts a narrative goal beat — but it's slipped to message level.",
  },
  {
    id: "partner-feedback",
    phase: "Partner Feedback",
    title: "Translating Partner Language",
    subtitle: "Pillars Fund gives feedback using specific copy. The coach separates construct from message.",
  },
  {
    id: "workshop-prep",
    phase: "Workshop Preparation",
    title: "Preparing for Partner Workshop",
    subtitle: "A strategist needs facilitation guidance for the goal-approval meeting.",
  },
  {
    id: "closing",
    phase: null,
    title: "What This Enables",
    subtitle: "Compound returns downstream",
  },
];

// --- Chat bubble components ---

function StrategistMsg({ text, delay = 0 }) {
  const [visible, setVisible] = useState(delay === 0);
  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);
  if (!visible) return null;
  return (
    <div style={{
      display: "flex", justifyContent: "flex-end", marginBottom: 16,
      animation: "slideInRight 0.4s ease both",
    }}>
      <div style={{
        maxWidth: "78%", background: "#2D2A4A", color: "#E8E6F0",
        padding: "14px 18px", borderRadius: "18px 18px 4px 18px",
        fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14.5, lineHeight: 1.55,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>
        <div style={{ fontSize: 11, color: "#A09CB8", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Strategist</div>
        {text}
      </div>
    </div>
  );
}

function CoachMsg({ children, delay = 0 }) {
  const [visible, setVisible] = useState(delay === 0);
  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);
  if (!visible) return null;
  return (
    <div style={{
      display: "flex", justifyContent: "flex-start", marginBottom: 16,
      animation: "slideInLeft 0.4s ease both",
    }}>
      <div style={{
        maxWidth: "82%", background: "#F4F2ED", color: "#1A1832",
        padding: "16px 20px", borderRadius: "18px 18px 18px 4px",
        fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14.5, lineHeight: 1.6,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        border: "1px solid #E0DDD4",
      }}>
        <div style={{ fontSize: 11, color: "#7A6F5D", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Strategy Coach
        </div>
        {children}
      </div>
    </div>
  );
}

function AltitudeTag({ level }) {
  const colors = {
    construct: { bg: "#E8F5E9", color: "#2E7D32", border: "#A5D6A7" },
    message: { bg: "#FFF3E0", color: "#E65100", border: "#FFCC80" },
    drift: { bg: "#FFEBEE", color: "#C62828", border: "#EF9A9A" },
  };
  const c = colors[level] || colors.construct;
  return (
    <span style={{
      display: "inline-block", fontSize: 10.5, fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: 99, background: c.bg, color: c.color,
      border: `1px solid ${c.border}`, marginRight: 6, verticalAlign: "middle",
    }}>{level}</span>
  );
}

function Highlight({ children, color = "#FFF9C4" }) {
  return <span style={{ background: color, padding: "1px 4px", borderRadius: 3 }}>{children}</span>;
}

// --- Scene content ---

function IntroScene() {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{
        fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
        letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09CB8", marginBottom: 16,
      }}>Interactive Demo</div>
      <h1 style={{
        fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 32, fontWeight: 700,
        color: "#1A1832", lineHeight: 1.2, marginBottom: 12,
      }}>Narrative Strategy Coach</h1>
      <p style={{
        fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 17, color: "#4A465E",
        maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6,
      }}>
        Walk through four moments from a Pillars Fund engagement to see how the coach keeps strategists at the right altitude — from discovery through goal approval.
      </p>
      <div style={{
        display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 500, margin: "0 auto",
      }}>
        {["Discovery", "Altitude Drift", "Partner Feedback", "Workshop Prep"].map((label, i) => (
          <div key={i} style={{
            padding: "8px 18px", borderRadius: 99,
            background: ["#EDE7F6","#FFF3E0","#E8F5E9","#E3F2FD"][i],
            color: ["#4527A0","#E65100","#2E7D32","#1565C0"][i],
            fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 600,
          }}>{label}</div>
        ))}
      </div>
      <div style={{
        marginTop: 40, fontSize: 13, color: "#9E99B0",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Use the arrows below to step through each scene →
      </div>
    </div>
  );
}

function DiscoveryScene() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <StrategistMsg text={
        <>I just got Pillars Fund's theory of change document plus a grant proposal for their narrative work on Muslim American communities. Can you help me synthesize what I'm seeing and flag what I should clarify before kickoff?</>
      } />
      <CoachMsg delay={300}>
        <div>Here's what I'm pulling from the materials:</div>
        <div style={{ margin: "14px 0", padding: "14px 16px", background: "#FAFAF6", borderRadius: 10, border: "1px solid #E8E5DC" }}>
          <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 10 }}>THEMES SURFACED</div>
          <div style={{ marginBottom: 8 }}>
            <strong>1. Counter-narrative framing.</strong> The ToC centers on moving beyond "deficit narratives" about Muslim Americans. This is a clear starting orientation — but we'll need to define whether the goal is <em>displacing</em> deficit narratives or <em>building alternative frames</em> that don't reference the deficit at all. Different measurement strategies follow from each.
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>2. "Thriving" as a keyword.</strong> Appears 14 times across both docs. This is clearly load-bearing language for Pillars — but it's currently doing double duty as both a value ("we believe communities should thrive") and an outcome ("we want to measure thriving"). Worth disambiguating early.
          </div>
          <div>
            <strong>3. Audience ambiguity.</strong> The grant proposal references "the general public" in some places and "policymakers" in others. These require different narrative strategies. I'd flag this as a first-meeting clarification.
          </div>
        </div>
        {step === 0 && (
          <div
            onClick={() => setStep(1)}
            style={{
              marginTop: 8, padding: "8px 16px", background: "#2D2A4A", color: "#E8E6F0",
              borderRadius: 8, cursor: "pointer", display: "inline-block",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}
          >See definitions to clarify ↓</div>
        )}
        {step >= 1 && (
          <div style={{ marginTop: 14, padding: "14px 16px", background: "#F0EDE6", borderRadius: 10, border: "1px solid #DDD8CC" }}>
            <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 10 }}>DEFINITIONS TO CLARIFY AT KICKOFF</div>
            <div style={{ marginBottom: 6 }}>• <strong>"Muslim American communities"</strong> — Does Pillars scope this ethnically, religiously, or both? Are recent immigrants in scope?</div>
            <div style={{ marginBottom: 6 }}>• <strong>"Narrative change"</strong> — Are we measuring belief shift in external audiences, or narrative production from within communities?</div>
            <div>• <strong>"Thriving"</strong> — Aspirational value or measurable construct? This distinction will shape the entire goal structure.</div>
          </div>
        )}
      </CoachMsg>
    </div>
  );
}

function AltitudeScene() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <StrategistMsg text={
        <>Here's my draft for Beat 2 of the narrative goal: "Muslim Americans are innovative leaders in business, tech, and the arts who are making outsized contributions to American prosperity."</>
      } />
      <CoachMsg delay={300}>
        <div style={{ marginBottom: 10 }}>
          <AltitudeTag level="drift" /> This beat has slipped to message altitude. Let me show you why.
        </div>
        <div style={{ margin: "12px 0", padding: "14px 16px", background: "#FFF8F0", borderRadius: 10, border: "1px solid #F0DCC8" }}>
          <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#BF5B00", marginBottom: 8 }}>ALTITUDE CHECK</div>
          <div style={{ marginBottom: 8 }}>
            <em>"innovative leaders in business, tech, and the arts"</em> — This is a <strong>message</strong>. It specifies sectors, which is a downstream creative choice. A survey fielded in six months shouldn't be locked to these three sectors.
          </div>
          <div>
            <em>"outsized contributions to American prosperity"</em> — This is also message-level. "Outsized" is a persuasive word choice, and "American prosperity" is an economic frame that may or may not match Pillars' intent.
          </div>
        </div>
        <div style={{ margin: "12px 0", padding: "14px 16px", background: "#F0FAF0", borderRadius: 10, border: "1px solid #C8E6C9" }}>
          <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#2E7D32", marginBottom: 8 }}>CONSTRUCT-LEVEL ALTERNATIVE</div>
          <div><AltitudeTag level="construct" /> <strong>"Muslim Americans are contributors to the strength and dynamism of American society."</strong></div>
          <div style={{ marginTop: 8, fontSize: 13.5, color: "#555" }}>
            This holds the same underlying belief — Muslim Americans as active contributors — without locking in which sectors or what kind of value. Messages about business, tech, and the arts can flow from this construct in the content testing phase.
          </div>
        </div>
        {!revealed && (
          <div
            onClick={() => setRevealed(true)}
            style={{
              marginTop: 8, padding: "8px 16px", background: "#2D2A4A", color: "#E8E6F0",
              borderRadius: 8, cursor: "pointer", display: "inline-block",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}
          >Show the single-belief filter ↓</div>
        )}
        {revealed && (
          <div style={{ marginTop: 14, padding: "14px 16px", background: "#FAFAF6", borderRadius: 10, border: "1px solid #E8E5DC" }}>
            <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 8 }}>SINGLE-BELIEF FILTER</div>
            <div style={{ marginBottom: 6 }}>✓ Can a survey respondent agree or disagree? <strong>Yes</strong> — "Muslim Americans contribute to American society's strength."</div>
            <div style={{ marginBottom: 6 }}>✓ Holds across platforms and messengers? <strong>Yes</strong> — doesn't require a specific sector frame.</div>
            <div style={{ marginBottom: 6 }}>✓ Requires policy knowledge? <strong>No.</strong></div>
            <div>✓ One idea stripped of language? <strong>"Contribution."</strong></div>
          </div>
        )}
      </CoachMsg>
    </div>
  );
}

function FeedbackScene() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <StrategistMsg text={
        <>Pillars loved the draft but Kashif had a note — he wants Beat 3 to say something about how "Muslim Americans shouldn't have to prove their patriotism to belong." He feels strongly about that specific language.</>
      } />
      <CoachMsg delay={300}>
        <div style={{ marginBottom: 10 }}>
          That's a powerful piece of feedback — and the instinct behind it is exactly right. Let me separate what's a <strong>construct</strong> from what's a <strong>message</strong>.
        </div>
        <div style={{ margin: "12px 0", padding: "14px 16px", background: "#FAFAF6", borderRadius: 10, border: "1px solid #E8E5DC" }}>
          <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 10 }}>CONSTRUCT vs. MESSAGE</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #D6D1C4" }}>
                <th style={{ textAlign: "left", padding: "8px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#2E7D32" }}>
                  <AltitudeTag level="construct" /> Belief (goes in the goal)
                </th>
                <th style={{ textAlign: "left", padding: "8px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#E65100" }}>
                  <AltitudeTag level="message" /> Language (endorsed for downstream)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid #EAE6DC", verticalAlign: "top" }}>
                  Muslim Americans' belonging in American society is <strong>inherent, not conditional</strong> on performance of loyalty.
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid #EAE6DC", verticalAlign: "top", fontStyle: "italic", color: "#666" }}>
                  "Shouldn't have to prove their patriotism to belong"
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {step === 0 && (
          <div
            onClick={() => setStep(1)}
            style={{
              marginTop: 8, padding: "8px 16px", background: "#2D2A4A", color: "#E8E6F0",
              borderRadius: 8, cursor: "pointer", display: "inline-block",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}
          >See the client-facing explanation ↓</div>
        )}
        {step >= 1 && (
          <div style={{ marginTop: 14, padding: "14px 16px", background: "#F5F0FF", borderRadius: 10, border: "1px solid #D9CCFF" }}>
            <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 8 }}>SUGGESTED LANGUAGE FOR KASHIF</div>
            <div style={{ fontStyle: "italic", color: "#444", lineHeight: 1.65 }}>
              "We love 'shouldn't have to prove their patriotism to belong' — it's exactly the kind of language that should show up in the content testing phase. For the narrative goal itself, we want to hold the underlying belief at a level that can be measured across audiences: <strong>belonging is inherent, not conditional.</strong> Kashif's language is how that belief gets activated in messages — and we'll protect it for that stage."
            </div>
          </div>
        )}
      </CoachMsg>
    </div>
  );
}

function WorkshopScene() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <StrategistMsg text={
        <>The goal-approval workshop is Thursday. I'm nervous the room will want to wordsmith every beat. How should I set up the session?</>
      } />
      <CoachMsg delay={300}>
        <div style={{ marginBottom: 10 }}>
          That pull toward wordsmithing is gravity in these meetings. Here's how to name it and work with it:
        </div>
        <div style={{ margin: "12px 0", padding: "14px 16px", background: "#FAFAF6", borderRadius: 10, border: "1px solid #E8E5DC" }}>
          <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 10 }}>OPENING FRAME (say this out loud)</div>
          <div style={{ fontStyle: "italic", color: "#444", lineHeight: 1.65 }}>
            "Today we're working on the <em>beliefs</em> we want to shift — not the words we'd use to shift them. If you find yourself reaching for perfect copy, that's a sign we've found something important. Flag it, we'll capture it, and it'll fuel the message testing later. For now, we need to agree on <em>what we believe should change</em>."
          </div>
        </div>
        {step === 0 && (
          <div
            onClick={() => setStep(1)}
            style={{
              marginTop: 8, padding: "8px 16px", background: "#2D2A4A", color: "#E8E6F0",
              borderRadius: 8, cursor: "pointer", display: "inline-block",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}
          >See beat-by-beat prompts ↓</div>
        )}
        {step >= 1 && (
          <>
            <div style={{ marginTop: 14, padding: "14px 16px", background: "#F0EDE6", borderRadius: 10, border: "1px solid #DDD8CC" }}>
              <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5D5475", marginBottom: 10 }}>BEAT-BY-BEAT DISCUSSION PROMPTS</div>
              <div style={{ marginBottom: 10 }}>
                <strong>Beat 1</strong> — <em>"We have two versions here. Version A frames belonging as a current reality to be recognized. Version B frames it as a right being denied. Which matches your theory of change?"</em>
              </div>
              <div style={{ marginBottom: 10 }}>
                <strong>Beat 2</strong> — <em>"Kashif, this one draws on language you gave us. Does 'contribution to American dynamism' hold the same idea, or does it lose something important?"</em>
              </div>
              <div>
                <strong>Beat 3</strong> — <em>"This beat is where we've seen the most gravitational pull toward messaging in earlier drafts. The belief underneath is about unconditional belonging. Does that ring true for the room?"</em>
              </div>
            </div>
            <div style={{ marginTop: 14, padding: "14px 16px", background: "#E8F5E9", borderRadius: 10, border: "1px solid #C8E6C9" }}>
              <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#2E7D32", marginBottom: 8 }}>TACTICAL TIPS</div>
              <div style={{ marginBottom: 6 }}>• Direct questions to specific people — "Kashif, does this capture…" beats "Does anyone have thoughts?"</div>
              <div style={{ marginBottom: 6 }}>• When someone offers great copy, write it on a visible "Endorsed Language" board. This honors the contribution without putting it in the goal.</div>
              <div>• Frame the final email as "final narrative goal" not "updated" — it signals closure and makes approval easier.</div>
            </div>
          </>
        )}
      </CoachMsg>
    </div>
  );
}

function ClosingScene() {
  return (
    <div style={{ textAlign: "center", padding: "30px 20px" }}>
      <div style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09CB8", marginBottom: 16 }}>Why This Matters</div>
      <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 26, fontWeight: 700, color: "#1A1832", lineHeight: 1.3, marginBottom: 20 }}>
        Precision here pays compound returns.
      </h2>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "left" }}>
        {[
          { label: "Narrative Goals", desc: "become the architecture for survey instruments" },
          { label: "Survey Instruments", desc: "become the measurement infrastructure for content testing" },
          { label: "Content Testing", desc: "becomes the evidence base for partner communications strategy" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", marginBottom: 20, gap: 14,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#2D2A4A", color: "#E8E6F0",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
            }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#1A1832" }}>{item.label}</div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14.5, color: "#5D5475", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 24, padding: "16px 20px", background: "#F5F0FF", borderRadius: 12,
        border: "1px solid #D9CCFF", maxWidth: 480, margin: "24px auto 0",
        fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14.5, color: "#444", lineHeight: 1.6,
        textAlign: "left",
      }}>
        A construct-level narrative goal that drifts to message altitude will produce survey items that test <em>language preference</em> rather than <em>belief prevalence</em>. The coach catches that drift in the first mile — so every mile after it runs clean.
      </div>
    </div>
  );
}

// --- Main app ---

export default function App() {
  const [scene, setScene] = useState(0);
  const containerRef = useRef(null);

  const current = SCENES[scene];
  const canPrev = scene > 0;
  const canNext = scene < SCENES.length - 1;

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [scene]);

  const renderScene = () => {
    switch (current.id) {
      case "intro": return <IntroScene />;
      case "discovery": return <DiscoveryScene />;
      case "altitude-catch": return <AltitudeScene />;
      case "partner-feedback": return <FeedbackScene />;
      case "workshop-prep": return <WorkshopScene />;
      case "closing": return <ClosingScene />;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "transparent",
      fontFamily: "'Source Serif 4', Georgia, serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "16px 24px", borderBottom: "1px solid #E8E5DC",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#FAFAF6",
      }}>
        <div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#A09CB8",
          }}>Harmony Labs</div>
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 18, fontWeight: 700,
            color: "#1A1832", marginTop: 2,
          }}>Strategy Coach</div>
        </div>
        {current.phase && (
          <div style={{
            padding: "6px 14px", borderRadius: 99, background: "#EDE7F6",
            color: "#4527A0", fontFamily: "'DM Sans', sans-serif", fontSize: 12,
            fontWeight: 600,
          }}>{current.phase}</div>
        )}
      </div>

      {/* Scene title bar */}
      <div style={{
        padding: "20px 24px 12px", background: "#FAFAF6",
        animation: "fadeIn 0.3s ease",
      }} key={scene}>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 22, fontWeight: 700,
          color: "#1A1832", margin: 0, lineHeight: 1.3,
        }}>{current.title}</h2>
        {current.subtitle && (
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14.5,
            color: "#6B6580", margin: "6px 0 0", lineHeight: 1.5,
          }}>{current.subtitle}</p>
        )}
      </div>

      {/* Chat area */}
      <div ref={containerRef} style={{
        padding: "16px 20px 100px", maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
      }} key={`content-${scene}`}>
        {renderScene()}
      </div>

      {/* Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "16px 24px", background: "linear-gradient(transparent, #FAFAF6 30%)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button
          onClick={() => canPrev && setScene(s => s - 1)}
          disabled={!canPrev}
          style={{
            padding: "10px 20px", borderRadius: 10, border: "1px solid #D6D1C4",
            background: canPrev ? "#fff" : "#F0EDE6", color: canPrev ? "#1A1832" : "#B8B3A8",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            cursor: canPrev ? "pointer" : "default", transition: "all 0.2s",
          }}
        >← Back</button>

        <div style={{
          display: "flex", gap: 6, alignItems: "center",
        }}>
          {SCENES.map((_, i) => (
            <div key={i} onClick={() => setScene(i)} style={{
              width: i === scene ? 20 : 8, height: 8, borderRadius: 99,
              background: i === scene ? "#2D2A4A" : "#D6D1C4",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>

        <button
          onClick={() => canNext && setScene(s => s + 1)}
          disabled={!canNext}
          style={{
            padding: "10px 20px", borderRadius: 10, border: "none",
            background: canNext ? "#2D2A4A" : "#D6D1C4", color: "#E8E6F0",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            cursor: canNext ? "pointer" : "default", transition: "all 0.2s",
          }}
        >Next →</button>
      </div>
    </div>
  );
}
